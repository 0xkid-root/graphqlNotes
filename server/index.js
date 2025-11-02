const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { default: axios } = require("axios");

// Define your schema
const typeDefs = `
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
`;

// Define your resolvers
const resolvers = {
  Todo: {
    user: async (todo) => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`);
        return response.data;
      } catch (error) {
        console.error(`Failed to fetch user ${todo.userId}:`, error.message);
        return null; // Or throw if you prefer strict error handling
      }
    },
  },
  Query: {
    getTodos: async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        return response.data;
      } catch (error) {
        console.error("Failed to fetch todos:", error.message);
        return [];
      }
    },
    getAllUsers: async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        return response.data;
      } catch (error) {
        console.error("Failed to fetch users:", error.message);
        return [];
      }
    },
    getUser: async (parent, { id }) => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Failed to fetch user ${id}:`, error.message);
        return null; // Or throw
      }
    },
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server (Apollo v5 style)
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 8000 },
    context: async () => ({}), // optional context
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer();