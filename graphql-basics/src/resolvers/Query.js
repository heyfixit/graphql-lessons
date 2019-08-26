const Query = {
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
  }

export { Query as default }
