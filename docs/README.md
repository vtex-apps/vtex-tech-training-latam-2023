# GraphQL Example

A reference app implementing a VTEX IO service with GraphQL resolvers.

![GraphQL Server Architecture](https://user-images.githubusercontent.com/18706156/77382285-bf2d6c80-6d5e-11ea-9f39-2c30b3ec3672.jpg)

We use [**Apollo Server**](https://www.apollographql.com/docs/apollo-server/) as the underlying framework along with some tweaks for our platform.

For communicating with external services or other VTEX IO apps, we use the [**node-vtex-api**](https://github.com/vtex/node-vtex-api), a VTEX set of utilities for Node services. You can import this package using NPM from `@vtex/api` (already imported on this project)

**Start from `graphq/schema.graphql` and `node/index.ts` and follow the comments and imports!**

When _linking_ a GraphQL app, our CLI will automatically provide you a **[GraphiQL](https://github.com/graphql/graphiql) endpoint**, for you to test the functionalities. You can also access a specific app's GraphiQL through the **GraphQL IDE** section on the admin site (as long as the [admin-graphql-ide](https://github.com/vtex-apps/admin-graphql-ide) app is installed on that account).

Queries, mutations and types defined on the `schema.graphql` will have theirs implementation on the `Service` object exported on `node/index.ts`.

> For more information about our GraphQL services, check [**graphql-server**](https://github.com/vtex/graphql-server) and its _Wiki_ (VTEX internal only).

## About GraphQL

It's important to understand what GraphQL is and how it compares with other popular API standards, such as REST.

There are many resources out there that can help understand the basics, so let's list a few of them here:

- [GraphQL website](http://graphql.org/learn/)
- [How to GraphQL](https://www.howtographql.com/basics/1-graphql-is-the-better-rest/)

## Recipes

### Configuring cache for specific queries

Caching is one of the most important strategies for making applications **fast and responsive**. This is achieved by setting **cache control hints** in the GraphQL schema. Our GraphQL Server computes a cache expiration date by combining `@cacheControl` declarations from the fields returned by a specific request, whereas the props `maxAge` and `scope` can be defined. It errs on the safe side for requests with multiple `@cacheControl` declarations, so shorter `maxAge` results override longer, and `PRIVATE` scope overrides `PUBLIC`.

- There are currently tree possible `maxAge`s _(LONG, MEDIUM and SHORT)_ and two possible `scope`s _(PRIVATE and PUBLIC)_.

Suppose that we want to create a simple catalog app that has two types, `type Product` and `type Order`. Since products don't change quickly throughout the day and anyone can see them, they can be cached with a maxAge `LONG` in a `PUBLIC` scope. Order, on the other hand, is a per user entity and should have a PRIVATE scope. To achieve this behavior, the following annotations must be included to the schema

```graphql
type Product @cacheControl(maxAge: LONG, scope: PUBLIC) {
  id: ID!
  name: String
  description: String
}

type Order @cacheControl(scope: PRIVATE) {
  id: ID!
  statusDescription: String
  description: String
}

type Query {
  listOrders: [Order]
  listProducts: [Product]
}
```

> **Note** to know more on how these cache hints work, take a look at the [Apollo Server docs for caching](https://www.apollographql.com/docs/apollo-server/performance/caching/)

Since our GraphQL implementation uses a CDN (Cloud-Front) to cache query responses, `PRIVATE` queries should land in a different endpoint from `PUBLIC` ones. Each endpoint have some configurations tweaks in the CDN and may lead to different behaviors. For example, to receive cookies in the backend, you need to be in a private route.

### Caching requests when using public endpoint

Requests to `graphql-server` using public endpoints are not cacheable, so they are given `cache-control` with `no-cache`. The way to override this behavior is to send the header `'x-vtex-cacheable': 'true'` on request.

### Resolving conflicts (`@context` directive)

Let's say that another app called `rewards-graphql` also defines a field named `products` inside the `Query` type. If both apps live on the same workspace/account it will cause some requests to fail, since our GraphQL server won't be able to automatically figure out which app should resolve that query.

For this use case we support a special directive called `@context`, which GraphQL clients can use to provide additional information to resolve these kind of conflicts.

#### Specifying provider

If the client knows about a conflict (or in any case, for precaution), it can specify which app defined the field it's requesting. In the example we've mentioned above, with that new `rewards-graphql` app, the client could send the query like this:

```graphql
query getProducts {
  products @context(provider: "vtex.products-graphql") {
    name
  }
}
```

This declares that we want to use the definition of `products` from `products-graphql`, not from `rewards-graphql`, so that it can properly rename and execute it.

#### Specifying sender

In some cases it might be hard for a client to know that a conflict can happen, since an app doesn't know about all other apps that may be running on a workspace, it only knows about its own direct dependencies. At the same time, we'd like to restrict apps so that they can only access types/fields defined by apps they directly depend on.

Both these problems can be solved by using the `@context` directive again, but this time using the `sender` argument. Basically, apps sending requests to `graphql-server` should include this directive announcing their names, so that it can restrict which parts of the schema can be accessed. Note that restricting the access also makes it easier for apps to know exactly when they'd need to specify a `provider`, since conflicts with apps they don't know about will never happen.

So, let's say that an app called `client-app`, that depends only on `products-graphql` is sending a GraphQL request. Even if `rewards-graphql` is running in the current workspace it won't need to specify the provider anymore, just set the `sender`.

```graphql
{
  products @context(sender: "vtex.client-app@1.2.3") {
    name
  }
}
```

**Note:** If you are requesting GraphQL data from React apps that uses the `react` builder the `sender` argument **is already baked** into every request it makes.

## 🗎 GraphQL documentation

This project use as dependency the [graphql-markdown](https://github.com/exogen/graphql-markdown) project, to generate markdown documentation based on GraphQL schema.

Do you need run this command below, in your terminal, to generate the documentation:

```bash
yarn graphql-markdown
```

## Splunk Dashboard

We have an (for now, VTEX-only, internal) Splunk dashboard to show all metrics related to your app. You can find it at:

https://splunk72.vtex.com/en-US/app/vtex_io_apps/node_app_metrics

After linking this app and making some requests, you can select `vtex.graphql-example` and see the metrics for your app. **Don't forget to check the box Development, as you are linking your app in a development workspace**.
