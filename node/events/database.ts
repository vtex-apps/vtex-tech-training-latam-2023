import type { EventContext } from '@vtex/api'

import type { Clients } from '../clients'

export async function initializeDatabase(ctx: EventContext<Clients>) {
  const {
    clients: { canciones },
  } = ctx

  try {
    await canciones.initializeDatabase()
  } catch (error) {
    console.error(error)
  }

  return true
}
