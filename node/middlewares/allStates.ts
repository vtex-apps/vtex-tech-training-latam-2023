export async function allStates(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
   const {
     clients: { sendEvents }
   } = ctx

  console.log(ctx.body)
   await sendEvents.sendMessage('XXXXXXXXX', JSON.stringify(ctx.body))
  
  await next()
}
