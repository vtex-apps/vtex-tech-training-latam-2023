import type { EventContext, IOClients } from '@vtex/api'

export async function example(ctx: EventContext<IOClients>) {
  console.log('RECEIVED EVENT', ctx.body)

  return true
}
