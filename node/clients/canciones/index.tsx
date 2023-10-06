import { MasterData } from '@vtex/api'

export class CancionesClient extends MasterData {
  private dataEntity = 'canciones'
  private schemaName = 'schema'
  private schema = {
    name: this.schemaName,
    properties: {
      name: { type: 'string', title: 'Nombre de la canción' },
      gender: { type: 'string', title: 'Genero de la canción' },
      author: { type: 'string', title: 'Autor de la canción' },
      album: { type: 'string', title: 'Album de la canción' },
    },
    'v-indexed': ['author'],
    'v-cache': false,
    'v-security': {
      allowGetAll: true,
      publicRead: [],
      publicWrite: [],
      publicFilter: [],
    },
    'v-immediate-indexing': true,
  }

  /**
   * initializeDatabase
   */
  public async initializeDatabase() {
    const schema = await this.getSchema({
      dataEntity: this.dataEntity,
      schema: this.schemaName,
    })

    if (!schema) {
      const newSchema = await this.createOrUpdateSchema({
        dataEntity: this.dataEntity,
        schemaName: this.schemaName,
        schemaBody: this.schema,
      })

      return newSchema
    }

    return schema
  }

  /**
   * getCanciones
   */
  public getCanciones(author: string, page: number, pageSize: number) {
    return this.searchDocuments({
      dataEntity: this.dataEntity,
      schema: this.schemaName,
      where: author ? `author="${author}"` : '',
      fields: ['name', 'gender', 'author', 'album'],
      pagination: {
        page,
        pageSize,
      },
    })
  }

  /**
   * createCancion
   */
  public createCancion(
    name: string,
    gender: string,
    author: string,
    album: string
  ) {
    return this.createDocument({
      dataEntity: this.dataEntity,
      schema: this.schemaName,
      fields: {
        name,
        gender,
        author,
        album,
      },
    })
  }
}
