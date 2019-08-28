import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});

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
