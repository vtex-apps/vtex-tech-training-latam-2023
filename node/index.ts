import type {
  ServiceContext,
  RecorderState,
  ClientsConfig,
} from '@vtex/api'
import { LRUCache, Service } from '@vtex/api'

import { Clients } from './clients'

import { example } from './events/example'
import { createSendEvent } from './routes/notify'
import { getCacheContext, setCacheContext } from './utils/cachedContext'
import { skuChange } from './events/skuChangeEvent'

const TREE_SECONDS_MS = 3 * 1000
const CONCURRENCY = 10
const TIMEOUT_MS = 800

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    events: {
      exponentialTimeoutCoefficient: 2,
      exponentialBackoffCoefficient: 2,
      initialBackoffDelay: 50,
      retries: 1,
      timeout: TREE_SECONDS_MS,
      concurrency: CONCURRENCY,
    },
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    code: number
  }
}

function sendEventWithTimer() {
  setInterval(function () {
    const context = getCacheContext()

    if (!context) {
      console.log('no context in memory')

      return
    }

    return createSendEvent(context)
  }, 30000)
  console.log('FIRED HERE')
}

sendEventWithTimer()

export default new Service({
  clients,
  events: {
    example,
    skuChange,
  },
  routes: {
    hcheck: (ctx: any) => {
      setCacheContext(ctx)
      ctx.set('Cache-Control', 'no-cache')
      ctx.status = 200
      ctx.body = 'ok'
    },
  },
})
