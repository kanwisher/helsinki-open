/* eslint-disable callback-return */
const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const { username, password, name } = req.body;
    if (!password) {
      throw new Error('Password is required.')
    }
    if (password.length <= 3) {
      throw new Error('Password must be greater than 3 characters.')
    }

    const user = new User({
      username,
      name,
      passwordHash: await bcrypt.hash(password, 10)
    })
    const result = await user.save();
    res.status(201).json(result)
  } catch (err) {
    err.statusCode = 400
    next(err)
  }
})

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   await Blog.findByIdAndRemove(id)
//   res.sendStatus(204)
// })

// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const blog = req.body

//   await Blog.findByIdAndUpdate(id, blog)
//   res.sendStatus(204)
// })

module.exports = router