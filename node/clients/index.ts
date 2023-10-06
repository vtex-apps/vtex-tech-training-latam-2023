import { IOClients } from '@vtex/api'

import { CancionesClient } from './canciones'

export class Clients extends IOClients {
  public get canciones() {
    return this.getOrSet('canciones', CancionesClient)
  }
}
