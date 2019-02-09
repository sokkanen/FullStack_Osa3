if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(bodyParser.json())
app.use(morgan(function (tokens, req, res) {
    const info =  [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
      ].join(' ')
    if (tokens.method(req, res) === 'POST'){
        const body = JSON.stringify(req.body)
        return info + body
    }
    return info
  }))
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (req, res, next) => {
    Person
    .find({})
    .then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
Person.findById(req.params.id)
.then(person => {
    if (person) {
        res.json(person.toJSON())
    } else {
        res.status(404).end()
    }
}).catch(error => next(error))
})

app.get('/info', (req, res, next) => {
    let x = 0
    Person.countDocuments({}, (err, count) => {
        const info = `<head><meta charset="UTF-8"></head>
        <p>Puhelinluettelossa on ${count} henkilön tiedot</p>` 
        return res.status(200).end(info)
    })
    .catch(error => next(error))

})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    console.log(body.name)
    console.log(body.number)

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
        res.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => {
        res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    if (error.name === 'CastError' && error.kind == 'ObjectId'){
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError'){
        return res.status(400).json({error: error.message})
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})