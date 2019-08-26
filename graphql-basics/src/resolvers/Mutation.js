import uuidv4 from 'uuid/v4';

const Mutation = {
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
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find(u => u.id === args.id);

    if (!user) {
      throw new Error('User not found.');
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(u => u.email === data.email);

      if (emailTaken) {
        throw new Error('Email in use.');
      }

      user.email = data.email;
    }

    if (typeof data.name === 'string') {
      user.name = data.name;
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }

    return user;
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
  updatePost(parent, args, { db }, info) {
    const { id, data } = args;
    const post = db.posts.find(p => p.id === id);

    if (!post) {
      throw new Error('Post not found.');
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }

    if (typeof data.body === 'string') {
      post.body = data.body;
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published;
    }

    return post;
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
  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const comment = db.comments.find(c => c.id === id);
    if (!comment) {
      throw new Error('Comment not found.');
    }

    if (typeof data.text === 'string') {
      comment.text = data.text;
    }

    return comment;
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
};

export { Mutation as default };
