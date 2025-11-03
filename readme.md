

## GraphQL Notes — Project Overview

This repository contains a small GraphQL example and a React client. These notes summarize the GraphQL architecture, the important files, sample queries, known issues, and recommended improvements (best practices).

---

## Quick architecture summary

- Server (primary): `server/index.js` — an Apollo Server (v5) running on port 8000. It exposes a schema with `User`, `Todo`, and `Query` types. Resolvers use `axios` to fetch data from https://jsonplaceholder.typicode.com.
- Thread backend (example): `threadBackend/src/index.ts` (and compiled `build/index.js`) — a tiny ApolloServer example on port 8080 that exposes a simple `hello` and `say(name: String)` query. Useful as a learning example.
- Client: `client/src/index.js` and `client/src/App.js` — a React app using `@apollo/client`. The client queries `getTodos` and reads nested `user` fields.

Flow: Client (ApolloClient) → HTTP → Apollo Server (`server/index.js`) → external REST (jsonplaceholder) → GraphQL response.

---

## Key files and what they contain

- `server/index.js` — GraphQL schema (`type User`, `type Todo`, `type Query`) and resolvers. `getTodos` calls `/todos` and `Todo.user` resolver calls `/users/:userId`.
- `threadBackend/src/index.ts` and `threadBackend/build/index.js` — quick GraphQL example for learning/testing on port 8080 (schema: `hello`, `say(name:String)`).
- `client/src/index.js` — Apollo Client setup. HTTP link points at `http://localhost:8000/`.
- `client/src/App.js` — GraphQL query with `useQuery` to fetch todos and nested user data.

---

## Schema (as implemented in `server/index.js`)

type User {
	id: ID!
	name: String!
	username: String!
	email: String!
	phone: String!
	website: String!
}

type Todo {
	id: ID!
	title: String!
	completed: Boolean!
	user: User
}

type Query {
	getTodos: [Todo]
	getAllUsers: [User]
	getUser(id: ID!): User
}

Notes:
- The `Todo` objects returned by the upstream REST API include a `userId` property. The GraphQL `Todo.user` resolver uses that `userId` to fetch the user record. `userId` is not exposed in the schema — that's an implementation detail.

---

## Sample queries (for `server/index.js`)

1) Get todos with nested user information

```graphql
query GetTodosWithUser {
	getTodos {
		id
		title
		completed
		user {
			id
			name
			email
		}
	}
}
```

2) Get a single user

```graphql
query GetUser($id: ID!) {
	getUser(id: $id) {
		id
		name
		username
		email
	}
}
```

---

## How to run locally (based on repo layout)

1. Server (GraphQL API on port 8000)

Open a terminal in `server/` and run:

```powershell
npm install
node index.js
```

The server starts via `startStandaloneServer` and logs the URL (e.g., `http://localhost:8000/`).

2. Thread backend (optional example server on port 8080)

Open `threadBackend/` and run the compiled JS or TypeScript dev runner:

```powershell
cd threadBackend
npm install
node build/index.js          # or run the TS source using ts-node if configured
```

3. Client (React app)

Open `client/` and run:

```powershell
npm install
npm start
```

By default the client uses Apollo Client with the HTTP link pointing to `http://localhost:8000/`.

---

## Known issues / important behavior to fix or be aware of

1. N+1 problem (performance)

 - The `getTodos` resolver fetches all todos in one call. The `Todo.user` field resolver then issues one HTTP call per todo to fetch its user (`/users/:userId`). If there are N todos, you may generate N additional HTTP requests (the N+1 problem).

2. No batching or caching

 - No `DataLoader` or request-scoped batching is implemented. There also isn't a cache (in-memory or Redis) for user lookups.

3. Error handling is basic

 - The server logs errors and returns `[]` or `null` on failures. Consider returning structured GraphQL errors via Apollo's error helpers for clearer client behavior.

4. No authentication, authorization, or rate-limiting

 - This is a demo; production servers should implement auth and rate-limiting and hide sensitive endpoints.

5. Upstream shape coupling

 - Resolvers rely on the JSONPlaceholder response shape (e.g., `userId` on todos). If the upstream shape changes, your resolvers may break. Validate/massage data before exposing it.

---

## Best-practice recommendations (concrete)

Priority fixes:

1. Add DataLoader to fix N+1

 - Use the `dataloader` package and create a request-scoped loader in Apollo `context` to batch and deduplicate user fetches.
 - If your REST API supports batching (e.g. `/users?ids=1,2,3`), implement a batch fetch. If not, DataLoader will still dedupe multiple identical ids per request and cache them for that request lifecycle.

2. Add caching for user lookups (medium)

 - Use an LRU cache or Redis with TTL for user responses. Cache by user id and invalidate TTL on updates.

3. Improve error handling and observability (high)

 - Use `ApolloError` for predictable errors, structured logging, and add request tracing (OpenTelemetry / Apollo Studio) if needed.

4. Validate and map external payloads (medium)

 - Use TypeScript types, runtime validators (Zod/Joi) or schema mapping layers so downstream GraphQL schema is not tightly coupled to upstream REST fields.

5. Tests and CI (high)

 - Add unit tests for resolvers (Jest + msw/nock to mock axios) and an integration test using `server.executeOperation` or spinning up the server in a test environment.

6. Schema and client codegen (medium)

 - Use GraphQL Code Generator to generate TypeScript types for client and server. This reduces runtime type mistakes and speeds frontend dev.

7. Expose a well-known GraphQL endpoint & playground (developer ergonomics)

 - Use `/graphql` path explicitly (rather than default `/`) and enable an explorer (Apollo Studio / GraphiQL) for local development (disabled in prod).

---

## Quick DataLoader pattern (idea)

1. Create a `userLoader` with `dataloader`:

```js
// batch function example
async function batchLoadUsers(ids) {
	// If upstream supports batch fetch, request /users?ids=1,2,3
	// Otherwise, parallel fetch + sort results to match ids
}

// in Apollo server context (per-request):
context: () => ({ userLoader: new DataLoader(batchLoadUsers) })

// in Todo.user resolver:
user: (todo, args, context) => context.userLoader.load(todo.userId)
```

---

## Suggested next tasks (I can help implement any of these)

- Implement DataLoader and wire it into `server/index.js` (fix N+1).  
- Add a small Jest test for `getTodos` and `Todo.user` with axios mocked.  
- Add caching layer for user fetches (LRU/Redis) and documented TTL.  
- Add a `README` section with sample GraphQL queries and how to run tests / dev server (already included above).

---

## Contacts & running notes

- Server is expected on `http://localhost:8000/` (verify console log when starting `node server/index.js`).  
- Client default Apollo URI: `http://localhost:8000/` (see `client/src/index.js`).

If you want, I can implement the DataLoader change and add a unit test next — tell me which to start with.

---

