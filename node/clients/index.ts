import { IOClients } from '@vtex/api'

import analytics from './analytics'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get analytics() {
    return this.getOrSet('analytics', analytics)
  }
}
