import { GraphQLServer } from 'graphql-yoga';

// Possible Types
// 5 Scalar Types - Type that stores a single value
// String, Boolean, Int, Float, ID
// as opposed to Collections - Objects and Arrays

// Dummy User Data
const users = [
  { id: 1, name: 'User1', email: 'user1@email.com', age: 50 },
  { id: 2, name: 'User2', email: 'user2@email.com', age: 50 },
  { id: 3, name: 'User3', email: 'user3@email.com', age: 50 }
];

// Type Definitions AKA Application Schema
const typeDefs = `
  type Query {
    me: User!
    post: Post!
    users(query: String): [User!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    body: String!
    published: Boolean!
  }
`;

// Resolver Functions
const resolvers = {
  Query: {
    me: () => ({ id: 'abc123', name: 'Test', email: 'test@test.com', age: 23 }),
    post: () => ({ id: 'abc123', body: 'Test', published: true }),
    users(parent, args, ctx, info) {
      const { query } = args;
      if (query) {
        return users.filter(u =>
          u.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      return users;
    }
  }
};

// Server
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log('The server is up!'));
