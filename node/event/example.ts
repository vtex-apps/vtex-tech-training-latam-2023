import { Clients } from './../clients/index'
import { EventContext } from '@vtex/api'

export async function example(ctx: EventContext<Clients>) {
  const liveUsersProducts = await ctx.clients.analytics.getLiveUsers()
  console.log('live users: ', liveUsersProducts)
  return true
}
