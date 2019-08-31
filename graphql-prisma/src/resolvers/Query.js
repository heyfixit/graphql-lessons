const Query = {
  me: () => ({ id: 'abc123', name: 'Test', email: 'test@test.com', age: 23 }),
  post: () => ({ id: 'abc123', body: 'Test', published: true }),
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          },
          {
            email_contains: args.query
          }
        ]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{ title_contains: args.query }, { body_contains: args.query }]
      };
    }

    return prisma.query.posts(opArgs, info);
    // const { query } = args;
    // if (query) {
    //   return db.posts.filter(p => {
    //     const titleMatch = p.title.toLowerCase().includes(query.toLowerCase());
    //     const bodyMatch = p.body.toLowerCase().includes(query.toLowerCase());
    //     return titleMatch || bodyMatch;
    //   });
    // }
    //
    // return db.posts;
  },
  comments(parent, args, { db, prisma }, info) {
    return prisma.query.comments(null, info);
  }
};

export { Query as default };
