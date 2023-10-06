const { execSync } = require('child_process')
const fs = require('fs')

const argv = require('minimist')(process.argv.slice(2))
const { nativeSchemaDirectivesTypeDefs } = require('@vtex/api')
const graphql = require('graphql')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { stitchingDirectives } = require('@graphql-tools/stitching-directives')

const { allStitchingDirectivesTypeDefs } = stitchingDirectives()

const DEFAULT_GRAPHQL_PATH = './graphql/**/*.{gql,graphql}'
const DEFAULT_MERGED_PATH = './merged.graphql'
const DEFAULT_MARKDOWN_PATH = './schema.md'

const GRAPHQL_ARG = argv['graphql-path']
const MERGED_ARG = argv['merged-path']
const MARKDOWN_ARG = argv['markdown-path']

const GRAPHQL_PATH = GRAPHQL_ARG || DEFAULT_GRAPHQL_PATH
const MERGED_PATH = MERGED_ARG || DEFAULT_MERGED_PATH
const MARKDOWN_PATH = MARKDOWN_ARG || DEFAULT_MARKDOWN_PATH

const loadedFiles = loadFilesSync(GRAPHQL_PATH)

const typeDefs = mergeTypeDefs(loadedFiles)

const schema = makeExecutableSchema({
  typeDefs: [
    allStitchingDirectivesTypeDefs,
    typeDefs,
    nativeSchemaDirectivesTypeDefs,
  ],
})

const printedSchema = graphql.printSchema(schema)

fs.writeFileSync(MERGED_PATH, printedSchema)

execSync(
  `graphql-markdown ${MERGED_PATH} > ${MARKDOWN_PATH} && rm ${MERGED_PATH}`
)
