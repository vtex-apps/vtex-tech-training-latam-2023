import { IOClients, CatalogGraphQL } from '@vtex/api'
import { Catalog } from '@vtex/clients'

import { SqsClient } from './events'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get sendEvents() {
    return this.getOrSet('sqsClient', SqsClient)
  }

  public get catalogGraphQL() {
    return this.getOrSet('catalogGraphQL', CatalogGraphQL)
  }

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }
}
