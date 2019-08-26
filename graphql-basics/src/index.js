import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
import db from './db';

// Resolver Functions
const resolvers = {
  Mutation: {
    createUser(parent, args, { db }, info) {
      const { email, age, name } = args.data;
      const emailTaken = db.users.some(u => u.email === email);
      if (emailTaken) {
        throw new Error('Email Taken.');
      }

      const newUser = { id: uuidv4(), email, age, name };
      db.users.push(newUser);
      return newUser;
    },
    deleteUser(parent, args, { db }, info) {
      const userIndex = db.users.findIndex(u => u.id === args.id);

      if (userIndex === -1) {
        throw new Error('User not found.');
      }

      db.posts = db.posts.filter(p => {
        const match = p.author === args.id;
        if (match) {
          db.comments = db.comments.filter(c => c.post !== p.id);
        }
        return !match;
      });
      db.comments = db.comments.filter(c => c.author !== args.id);
      const foundUser = db.users[userIndex];
      db.users.splice(userIndex, 1);
      return foundUser;
    },
    createPost(parent, args, { db }, info) {
      const userExists = db.users.some(u => u.id === args.author);

      if (!userExists) {
        throw new Error('User does not exist.');
      }

      const newPost = { id: uuidv4(), ...args.post };
      db.posts.push(newPost);

      return newPost;
    },
    deletePost(parent, args, { db }, info) {
      const postIndex = db.posts.findIndex(p => p.id === args.id);
      if (postIndex === -1) {
        throw new Error('Post not found.');
      }

      // remove comments associated to this post
      db.comments = db.comments.filter(c => c.post !== args.id);

      // remove post
      const foundPost = db.posts[postIndex];
      db.posts.splice(postIndex, 1);
      return foundPost;
    },
    createComment(parent, args, { db }, info) {
      const userExists = db.users.some(u => u.id === args.comment.author);
      if (!userExists) {
        throw new Error('User does not exist.');
      }

      const newComment = { id: uuidv4(), ...args.comment };
      db.comments.push(newComment);
      return newComment;
    },
    deleteComment(parent, args, { db }, info) {
      const commentIndex = db.comments.findIndex(c => c.id == args.id);
      if (commentIndex === -1) {
        throw new Error('Comment not found.');
      }

      const foundComment = db.comments[commentIndex];
      db.comments.splice(commentIndex, 1);
      return foundComment;
    }
  },
  Query: {
    me: () => ({ id: 'abc123', name: 'Test', email: 'test@test.com', age: 23 }),
    post: () => ({ id: 'abc123', body: 'Test', published: true }),
    users(parent, args, { db }, info) {
      const { query } = args;
      if (query) {
        return db.users.filter(u =>
          u.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      return db.users;
    },
    posts(parent, args, { db }, info) {
      const { query } = args;
      if (query) {
        return db.posts.filter(p => {
          const titleMatch = p.title
            .toLowerCase()
            .includes(query.toLowerCase());
          const bodyMatch = p.body.toLowerCase().includes(query.toLowerCase());
          return titleMatch || bodyMatch;
        });
      }

      return db.posts;
    },
    comments(parent, args, { db }, info) {
      return db.comments;
    }
  },
  Post: {
    author(parent, args, { db }, info) {
      return db.users.find(u => u.id === parent.author);
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(c => c.post === parent.id);
    }
  },
  User: {
    posts(parent, args, { db }, info) {
      return db.posts.filter(p => p.author === parent.id);
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(c => c.author === parent.id);
    }
  },
  Comment: {
    author(parent, args, { db }, info) {
      return db.users.find(u => u.id === parent.author);
    },
    post(parent, args, { db }, info) {
      return db.posts.find(p => p.id === parent.post);
    }
  }
};

// Server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db
  }
});

server.start(() => console.log('The server is up!'));
