import type { ParamsContext, RecorderState, ServiceContext } from '@vtex/api'
import { Service } from '@vtex/api'

import { Clients } from './clients'
import { createCancion, getCanciones } from './resolvers/canciones'
import { initializeDatabase } from './events/database'

const MEDIUM_TIMEOUT_MS = 60 * 1000

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>
}

// Export a service that defines resolvers and clients' options
export default new Service<Clients, RecorderState, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        timeout: MEDIUM_TIMEOUT_MS,
      },
    },
  },
  events: {
    initializeDatabase,
  },
  graphql: {
    resolvers: {
      Query: {
        getCanciones,
      },
      Mutation: {
        createCancion,
      },
    },
  },
})
