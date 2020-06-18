const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.json())
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

app.use(morganCustom)
let persons = [
  {
      "name": "David Kanwisher",
      "phone": "(980) 267-5908",
      "id": 2
  },
  {
      "name": "Mirsada Kanwisher",
      "phone": "999-999-9999",
      "id": 3
  },
  {
      "name": "David Duck",
      "phone": "111-111-1111",
      "id": 4
  },
  {
      "name": "Lindsay Kanwisher",
      "phone": "444-444-4444",
      "id": 5
  }
]


app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  body.id = Math.floor((Math.random() * 900000) + 1)
  if (!body.name || !body.phone) {
    res.sendStatus(400)
  } else {
    const exists = persons.some((person) => person.name.toLowerCase() === body.name.toLowerCase());
    if (exists) {
      res.status(409).json( { error: `${body.name} already exists`});
    } else {
      persons.push(body);
      res.sendStatus(201)
    }
  }

})


app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.sendStatus(404)
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((person) => person.id !== id)

  res.sendStatus(204)
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})