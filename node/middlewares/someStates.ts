export async function someStates(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  console.log(ctx.body)
  await next()
}
