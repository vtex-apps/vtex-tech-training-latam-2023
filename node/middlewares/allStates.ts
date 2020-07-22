export async function allStates(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  console.log(ctx.body)
  await next()
}
