export default class CustomGraphQLError extends Error {
    graphQLErrors: any;
    constructor(message: string, graphQLErrors: any[]);
}
