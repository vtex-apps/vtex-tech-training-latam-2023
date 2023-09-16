import type { EventContext } from '@vtex/api'
import { Clients } from '../clients'

export async function skuChange(ctx: EventContext<Clients>) {
  const {
    clients: { catalog, sendEvents },
  } = ctx

  console.log('RECEIVED EVENT', ctx.body)

  const { IdSku } = ctx.body

  console.log('ID SKU', IdSku)

  try {
    const skuContext = await catalog.getSkuById(IdSku)
    console.log('SKU CONTEXT', skuContext)

    await sendEvents.sendMessage('XXXXXXXXX', JSON.stringify(skuContext));
  } catch (error) {
    console.log(JSON.stringify(error, null, 2))
  }

  return true
}
