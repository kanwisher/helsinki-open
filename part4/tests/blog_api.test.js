const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'David Kanwisher',
    url: 'http://something.com',
    likes: 5
  },
  {
    title: 'css is hard',
    author: 'Mirsada Kanwisher',
    url: 'http://nothing.net',
    likes: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog)
    // eslint-disable-next-line no-await-in-loop
    await blogObject.save()
  }
})

test('api returns json response', async () => {
  await api
    .get('/api/blog')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are `n` blogs', async () => {
  const response = await api.get('/api/blog')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first blog is titled about HTML', async () => {
  const response = await api.get('/api/blog')

  expect(response.body[0].title).toBe('HTML is easy')
})

test('a valid note can be added', async () => {
  const blogObject = {
    title: 'brand spankin new',
    author: 'djk',
    url: 'www.com',
    likes: 2
  }

  await api
      .post('/api/blog')
      .send(blogObject)
      .expect(201)
      .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blog')
  const titles = response.body.map((blog) => blog.title)
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('brand spankin new')

})

test('_id field should be id', async () => {
  const response = await api.get('/api/blog')
  expect(response.body[0].id).toBeDefined();
})

test('only blogs with required keys can be added', async () => {
  const blogObject = {
    // Missing data
  }

  await api
    .post('/api/blog')
    .send(blogObject)
    .expect(400)

  const response = await api.get('/api/blog')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('if likes are ommited, they default to zero', async () => {
  const blogObject = {
    title: 'missing likes',
    author: 'djk',
    url: 'www.com'
  }

  const response = await api
    .post('/api/blog')
    .send(blogObject)

  expect(response.body.likes).toBe(0)
})

test('delete should work ', async () => {
  const response = await api.get('/api/blog');
  const startingBlogCount = response.body.length
  const blog = response.body[0]

  await api
    .delete(`/api/blog/${blog.id}`)
    .expect(204)

  const newResponse = await api.get('/api/blog');
  const endingBlogCount = newResponse.body.length

  expect(endingBlogCount).toBe(startingBlogCount - 1)
})

test('can update', async () => {
  const response = await api.get('/api/blog')
  const blog = response.body[0]
  const originalLikes = blog.likes
  blog.likes += 1

  await api
    .put(`/api/blog/${blog.id}`)
    .send(blog)
    .expect(204)

  const newResponse = await api.get('/api/blog')
  const updatedBlog = newResponse.body.find(b => b.id === blog.id)

  expect(updatedBlog.likes).toBe(originalLikes + 1)
})

afterAll(() => {
  mongoose.connection.close()
})

