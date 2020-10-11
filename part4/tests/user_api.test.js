const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

const initialUsers = [
  {
    username: 'admin',
    password: 'password',
    name: 'david'
  }
]

beforeEach(async () => {
  await User.deleteMany({})

  for (const user of initialUsers) {
    // eslint-disable-next-line no-await-in-loop
    user.passwordHash = await bcrypt.hash(user.password, 10)
    const userObject = new User(user)
    // eslint-disable-next-line no-await-in-loop
    await userObject.save()
  }
})

test('api returns json response', async () => {
  await api
    .get('/api/user')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are `n` users', async () => {
  const response = await api.get('/api/user')

  expect(response.body).toHaveLength(initialUsers.length)
})

test('the first user returns public info (not passwordHash)', async () => {
  const response = await api.get('/api/user')
  const firstUser = response.body[0]
  expect(firstUser).toMatchObject({
    username: expect.any(String),
    name: expect.any(String),
    id: expect.any(String)
  })
  expect(firstUser).not.toHaveProperty('passwordHash')
})

test('a valid user can be added', async () => {
  const userObject = {
    username: 'kanwisher',
    name: 'the best',
    password: 'something_secure'
  }

  await api
      .post('/api/user')
      .send(userObject)
      .expect(201)
      .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/user')
  const usernames = response.body.map(({ username }) => username)
  expect(response.body).toHaveLength(initialUsers.length + 1)
  expect(usernames).toContain('kanwisher')

})

describe('a user is invalid when:', () => {
  test('password has fewer than 4 characters', async () => {
    const userObject = {
      username: 'shorty',
      name: 'need more',
      password: 'abc'
    }

    const response = await api
        .post('/api/user')
        .send(userObject)
        .expect(400)

    expect(response.body.error)
    .toBe('Password must be greater than 3 characters.')
  })

  test('password is empty', async () => {
    const userObject = {
      username: 'shorty',
      name: 'need more',
      password: null
    }

    const response = await api
        .post('/api/user')
        .send(userObject)
        .expect(400)

    expect(response.body.error)
        .toBe('Password is required.')
  })
})

// test('_id field should be id', async () => {
//   const response = await api.get('/api/blog')
//   expect(response.body[0].id).toBeDefined();
// })

// test('only blogs with required keys can be added', async () => {
//   const blogObject = {
//     // Missing data
//   }

//   await api
//     .post('/api/blog')
//     .send(blogObject)
//     .expect(400)

//   const response = await api.get('/api/blog')
//   expect(response.body).toHaveLength(initialBlogs.length)
// })

// test('if likes are ommited, they default to zero', async () => {
//   const blogObject = {
//     title: 'missing likes',
//     author: 'djk',
//     url: 'www.com'
//   }

//   const response = await api
//     .post('/api/blog')
//     .send(blogObject)

//   expect(response.body.likes).toBe(0)
// })

// test('delete should work ', async () => {
//   const response = await api.get('/api/blog');
//   const startingBlogCount = response.body.length
//   const blog = response.body[0]

//   await api
//     .delete(`/api/blog/${blog.id}`)
//     .expect(204)

//   const newResponse = await api.get('/api/blog');
//   const endingBlogCount = newResponse.body.length

//   expect(endingBlogCount).toBe(startingBlogCount - 1)
// })

// test('can update', async () => {
//   const response = await api.get('/api/blog')
//   const blog = response.body[0]
//   const originalLikes = blog.likes
//   blog.likes += 1

//   await api
//     .put(`/api/blog/${blog.id}`)
//     .send(blog)
//     .expect(204)

//   const newResponse = await api.get('/api/blog')
//   const updatedBlog = newResponse.body.find(b => b.id === blog.id)

//   expect(updatedBlog.likes).toBe(originalLikes + 1)
// })

afterAll(() => {
  mongoose.connection.close()
})