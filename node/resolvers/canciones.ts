interface Args {
  author: string
  page: number
  pageSize: number
}

interface ArgsCreateCancion {
  name: string
  gender: string
  author: string
  album: string
}

export const getCanciones = async (
  _: any,
  { author, page, pageSize }: Args,
  { clients: { canciones } }: Context
) => canciones.getCanciones(author, page, pageSize)

export const createCancion = async (
  _: any,
  { name, gender, author, album }: ArgsCreateCancion,
  { clients: { canciones } }: Context
) => canciones.createCancion(name, gender, author, album)
// [
//   {
//     name: 'Canción 1',
//     gender: 'Reggue',
//     author: 'Author 1',
//   },
//   {
//     name: 'Canción 2',
//     gender: 'Rock',
//     author: 'Author 2',
//   },
//   {
//     name: 'Canción 3',
//     gender: 'Metal',
//     author: 'Author 3',
//   },
// ]
