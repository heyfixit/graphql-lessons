import { GraphQLServer } from 'graphql-yoga';

// Possible Types
// 5 Scalar Types - Type that stores a single value
// String, Boolean, Int, Float, ID
// as opposed to Collections - Objects and Arrays

// Type Definitions AKA Application Schema
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`;

// Resolvers
const resolvers = {
  Query: {
    id() {
      return 'abc123';
    },
    name() {
      return 'Dude';
    },
    age() {
      return 27;
    },
    employed() {
      return true;
    },
    gpa() {
      return 300.5;
    }
  }
};

// Server
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log('The server is up!'));
