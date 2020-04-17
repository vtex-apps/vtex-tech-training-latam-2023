import {
  Service,
  IOClients,
  ParamsContext,
  ServiceContext,
  RecorderState,
} from '@vtex/api'
import { example } from './events/example'
import { createSendEvent } from './routes/notify'

const TREE_SECONDS_MS = 3 * 1000
const CONCURRENCY = 10

declare global {
  type Context = ServiceContext<IOClients, State>

  interface State extends RecorderState {
    code: number
  }
}

function sendEventWithTimer(
  ctx: ServiceContext<IOClients, State, ParamsContext>
) {
  setInterval(function() {
    return createSendEvent(ctx)
  }, 1000)
  console.log('FIRED HERE')
}

export default new Service<IOClients, State, ParamsContext>({
  clients: {
    options: {
      events: {
        exponentialTimeoutCoefficient: 2,
        exponentialBackoffCoefficient: 2,
        initialBackoffDelay: 50,
        retries: 1,
        timeout: TREE_SECONDS_MS,
        concurrency: CONCURRENCY,
      },
    },
  },
  events: {
    example,
  },
})
