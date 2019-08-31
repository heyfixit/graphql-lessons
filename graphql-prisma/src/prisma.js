import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});

export { prisma as default };

// prisma.query.users(null, '{id name email posts { id title }}').then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });
//
// prisma.query
//   .comments(null, '{id text}')
//   .then(data => console.log(JSON.stringify(data, undefined, 2)));

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: 'Test Title 222',
//         body: 'asdfjkl;',
//         published: true,
//         author: {
//           connect: {
//             id: 'some id'
//           }
//         }
//       }
//     },
//     '{id title body published}'
//   )
//   .then(data => {
//     console.log(data);
//     return prisma.query.users(null, '{ id name posts { id title }}');
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.query
//   .posts(null, '{id body}')
//   .then(data => {
//     const lastPost = data[data.length - 1];
//     return prisma.mutation.updatePost(
//       {
//         where: { id: lastPost.id },
//         data: { body: 'A new body', published: true }
//       },
//       '{id title body author { id name }}'
//     );
//   })
//   .then(data => console.log(JSON.stringify(data, undefined, 2)))
//   .catch(console.log);

// prisma.query
//   .posts(null, '{id title body published}')
//   .then(data => console.log(JSON.stringify(data, undefined, 2)));

// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId });
//
//   if (!userExists) {
//     throw new Error('User not found.');
//   }
//
//   const post = await prisma.mutation.createPost(
//     {
//       data: { ...data, author: { connect: { id: authorId } } }
//     },
//     '{ id }'
//   );
//
//   const user = await prisma.query.user(
//     { where: { id: authorId } },
//     '{ id name email posts { id title published }}'
//   );
//
//   return user;
// };
//
// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: postId });
//
//   if (!postExists) {
//     throw new Error('Post not found.')
//   }
//
//   const postInfo = await prisma.mutation.updatePost(
//     { where: { id: postId }, data },
//     '{ author { id name email posts { id title body published} }}'
//   );
//
//   return postInfo.author;
// };

// create a post for the first user
// prisma.query
//   .users(null, '{ id }')
//   .then(([firstUser]) =>
//     createPostForUser(firstUser.id, {
//       title: 'Some Post Title',
//       body: 'Some Post Body',
//       published: true
//     })
//   )
//   .then(data => console.log(JSON.stringify(data, undefined, 2)));

// update the first post
// prisma.query
//   .posts(null, '{ id }')
//   .then(([firstPost]) =>
//     updatePostForUser(firstPost.id, { body: 'Edited Body' })
//   )
//   .then(data => console.log(JSON.stringify(data, undefined, 2)));

// exists
// prisma.exists
//   .Comment({
//     text: 'This is a comment'
//   })
//   .then(console.log);
