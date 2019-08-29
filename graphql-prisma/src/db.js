const users = [
  { id: '1', name: 'User1', email: 'user1@email.com', age: 50 },
  { id: '2', name: 'User2', email: 'user2@email.com', age: 50 },
  { id: '3', name: 'User3', email: 'user3@email.com', age: 50 }
];

const posts = [
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

const comments = [
  { id: '1', text: 'Comment 1', author: '1', post: '1' },
  { id: '2', text: 'Comment 2', author: '1', post: '2' },
  { id: '3', text: 'Comment 3', author: '3', post: '3' },
  { id: '4', text: 'Comment 4', author: '2', post: '1' }
];

const db = {
  users,
  posts,
  comments
}

export { db as default }
