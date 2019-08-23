import { GraphQLServer } from 'graphql-yoga';

// Type Definitions AKA Application Schema
const typeDefs = `
  type Query {
    hello: String!,
    hello2: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query!';
    },
    hello2: () => 'This is my second query!'
  }
};

// Server
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log('The server is up!'));
