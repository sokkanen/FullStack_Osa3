const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('Connected')
  })
  .catch((error) => {
    console.log('Failed to connect: ', error.message)
  })
const personSchema = new mongoose.Schema({
  name:{
    type: String,
    minlength: [3, 'minimum length for name is 3 characters'],
    required: true,
    unique: true
  },
  number:{
    type: String,
    minlength: [8, 'minimum length for number is 8 characters'],
    required: true
  }
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)