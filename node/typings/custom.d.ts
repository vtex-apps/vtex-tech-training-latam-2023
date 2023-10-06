export interface Book {
  authors: string[]
  cacheId?: string
  id: string
  name: string
}

export interface BookInput {
  name: Book['name']
  authors: Book['authors']
}

export type Maybe<T> = T | void
