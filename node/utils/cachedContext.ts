let context: any = null

export const getCacheContext = () => {
  return context
}

export function setCacheContext(ctx: any) {
  context = ctx
}
