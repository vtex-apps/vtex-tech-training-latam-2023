import { IOClients } from '@vtex/api'

import CatalogClient from './catalog'
import ChatGPTClient from './chatgpt'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get catalog() {
    return this.getOrSet('catalog', CatalogClient)
  }

  public get chatgpt() {
    return this.getOrSet('chatgpt', ChatGPTClient)
  }
}
