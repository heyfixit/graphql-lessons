import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// Possible Types
// 5 Scalar Types - Type that stores a single value
// String, Boolean, Int, Float, ID
// as opposed to Collections - Objects and Arrays

// Dummy User Data
let users = [
  { id: '1', name: 'User1', email: 'user1@email.com', age: 50 },
  { id: '2', name: 'User2', email: 'user2@email.com', age: 50 },
  { id: '3', name: 'User3', email: 'user3@email.com', age: 50 }
];

let posts = [
  {
    id: '1',
    title: 'Post1 Title',
    body: 'Post1 Body',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'Post2 Title',
    body: 'Post2 Body',
    published: true,
    author: '1'
  },
  {
    id: '3',
    title: 'Post3 Title',
    body: 'Post3 Body',
    published: true,
    author: '3'
  },
  {
    id: '4',
    title: 'Post4 Title',
    body: 'Post4 Body',
    published: true,
    author: '2'
  }
];

let comments = [
  { id: '1', text: 'Comment 1', author: '1', post: '1' },
  { id: '2', text: 'Comment 2', author: '1', post: '2' },
  { id: '3', text: 'Comment 3', author: '3', post: '3' },
  { id: '4', text: 'Comment 4', author: '2', post: '1' }
];

// Type Definitions AKA Application Schema
const typeDefs = `
  type Query {
    me: User!
    post: Post!
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    createPost(post: CreatePostInput): Post!
    createComment(comment: CreateCommentInput): Comment!
    deleteUser(id: ID!): User!
    deletePost(id: ID!): Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    body: String!
    published: Boolean!
    title: String!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

// Resolver Functions
const resolvers = {
  Mutation: {
    createUser(parent, args, ctx, info) {
      const { email, age, name } = args.data;
      const emailTaken = users.some(u => u.email === email);
      if (emailTaken) {
        throw new Error('Email Taken.');
      }

      const newUser = { id: uuidv4(), email, age, name };
      users.push(newUser);
      return newUser;
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex(u => u.id === args.id);

      if (userIndex === -1) {
        throw new Error('User not found.');
      }

      posts = posts.filter(p => {
        const match = p.author === args.id;
        if (match) {
          comments = comments.filter(c => c.post !== p.id);
        }
        return !match;
      });
      comments = comments.filter(c => c.author !== args.id);
      const foundUser = users[userIndex];
      users.splice(userIndex, 1);
      return foundUser;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some(u => u.id === args.author);

      if (!userExists) {
        throw new Error('User does not exist.');
      }

      const newPost = { id: uuidv4(), ...args.post };
      posts.push(newPost);

      return newPost;
    },
    deletePost(parent, args, ctx, info) {
      const postIndex = posts.findIndex(p => p.id === args.id);
      if (postIndex === -1) {
        throw new Error('Post not found.');
      }

      // remove comments associated to this post
      comments = comments.filter(c => c.post !== args.id);

      // remove post
      const foundPost = posts[postIndex];
      posts.splice(postIndex, 1);
      return foundPost;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some(u => u.id === args.comment.author);
      if (!userExists) {
        throw new Error('User does not exist.');
      }

      const newComment = { id: uuidv4(), ...args.comment };
      comments.push(newComment);
      return newComment;
    }
  },
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
    },
    comments(parent, args, ctx, info) {
      return comments;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(u => u.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(c => c.post === parent.id);
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(p => p.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(c => c.author === parent.id);
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(u => u.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find(p => p.id === parent.post);
    }
  }
};

// Server
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log('The server is up!'));
