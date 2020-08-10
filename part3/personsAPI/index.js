require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
const morganCustom = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
})

function PhoneBookError(code, message, error) {
  return { code, message, error }
}

app.use(morganCustom)

app.get('/api/persons', async (req, res) => {
  const contacts = await Contact.find({})
  res.json(contacts)
})

app.post('/api/persons', async (req, res) => {
  const { name, number } = req.body
  if (!name || !number) {
    res.sendStatus(400)
  } else {
    const existingContact = await Contact.find({ name })
    
    if (existingContact.length) {
      res.status(409).json( { error: `${name} already exists`})
    } else {
      const newContact = new Contact({
        name,
        number
      })
      const savedContact = await newContact.save()
      res.status(201).json(savedContact)
    }
   }
})

app.put('/api/persons/:id', async (req, res) => {
  const existingContact = await Contact.findById(req.params.id)
  existingContact.number = req.body.number
  await existingContact.save()
  res.status(200).json(existingContact);
})


app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const existingContact = await Contact.findById(req.params.id)
    if (existingContact) {
      res.json(existingContact)
    } else {
     res.sendStatus(404)
    }
  }  catch(e) {
    const error = new PhoneBookError(400, 'malformed id', e);
    next(error);
  }
})

app.delete('/api/persons/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id)

  res.sendStatus(204)
})

app.get('/info', async (req, res) => {
  const contactCount = await Contact.countDocuments({});
  res.send(`<p>Phonebook has info for ${contactCount} people</p><p>${new Date()}`)
})

const unknownRoute = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownRoute) // will hit if no endpoint matched

const errorRoute = ({ code, message, error }, req, res, next) => {
  console.log('handled exception in errorRoute:', error)
  res.status(code).send({ error: message})
}

app.use(errorRoute) // will hit if `next` is called with an argument

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})