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

const posts = [
  {
    id: 1,
    title: 'Post1 Title',
    body: 'Post1 Body',
    published: true,
    author: 1
  },
  {
    id: 2,
    title: 'Post2 Title',
    body: 'Post2 Body',
    published: true,
    author: 1
  },
  {
    id: 3,
    title: 'Post3 Title',
    body: 'Post3 Body',
    published: true,
    author: 3
  },
  {
    id: 4,
    title: 'Post4 Title',
    body: 'Post4 Body',
    published: true,
    author: 2
  }
];

// Type Definitions AKA Application Schema
const typeDefs = `
  type Query {
    me: User!
    post: Post!
    users(query: String): [User!]!
    posts(query: String): [Post!]!
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
    title: String!
    author: User!
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
    },
    posts(parent, args, ctx, info) {
      const { query } = args;
      if (query) {
        return posts.filter(p => {
          const titleMatch = p.title
            .toLowerCase()
            .includes(query.toLowerCase());
          const bodyMatch = p.body.toLowerCase().includes(query.toLowerCase());
          return titleMatch || bodyMatch;
        });
      }

      return posts;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((u) => u.id === parent.author);
    }
  }
};

// Server
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log('The server is up!'));
