const { TestScheduler } = require('jest')
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

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
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

afterAll(() => {
  mongoose.connection.close()
})

