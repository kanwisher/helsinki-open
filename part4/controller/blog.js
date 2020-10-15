/* eslint-disable callback-return */
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', '-blogs')
  res.json(blogs)
})

router.post('/', async (req, res, next) => {
  let decodedToken = null
  try {
    decodedToken = jwt.verify(req.token, process.env.TOKEN_SECRET)
  } catch (err) {
    res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  // eslint-disable-next-line prefer-object-spread
  const blogSchema = Object.assign({ user: user.id }, req.body)
  const blog = new Blog(blogSchema)
  try {
    const result = await blog.save();
    user.blogs = user.blogs.concat(blog.id)
    await user.save()
    res.status(201).json(result)
  } catch (err) {
    console.log('what happened')
    err.statusCode = 400
    next(err)
  }
})
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndRemove(id)
  await User.update({
    $pull: { blogs: id }
  })
  res.sendStatus(204)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const blog = req.body

  await Blog.findByIdAndUpdate(id, blog)
  res.sendStatus(204)
})
module.exports = router