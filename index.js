const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

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
app.use(cors)

let persons = [
    {
      "id": 1,
      "name": "Jamppa Tuominen",
      "number": "050-1234567"
    },
    {
        "id": 2,
        "name": "Jaakko Parantainen",
        "number": "02-2323232"
    }
  ]

const generateId = () => {
    while(1){
        const gid = Math.floor(Math.random() * (10000000 - 1)) + 1
        p = persons.find(p => p.id === gid)
        if (!p){
            return gid
        }
    }
}

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const p = persons.length
    const info = `<head><meta charset="UTF-8"></head>
    <p>Puhelinluettelossa on ${p} henkilön tiedot</p>` 
    return res.status(200).end(info)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    const found = persons.find(p => p.name === body.name)
    if (body.name === undefined && body.number === undefined){
        return res.status(400).json({
            error: 'name and number missing'
        })
    } else if(body.number === undefined){
        return res.status(400).json({
            error: 'number missing'
        })
    } else if(body.name === undefined){
        return res.status(400).json({
            error: 'name missing'
        })
    } else if(found){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        "id": generateId(),
        "name": body.name,
        "number":body.number
    }

    persons = persons.concat(person)

    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})