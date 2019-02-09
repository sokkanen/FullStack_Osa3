const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

mongoose.connect(url, {useNewUrlParser: true})
.then(result => {
    console.log('Connected')
})
.catch((error) => {
    console.log('Failed to connect: ', error.message)
})
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength: [5, 'minimum length for name is 5 characters'],
        required: true
    },
    number:{
        type: String,
        minlength: [5, 'minimum length for number is 5 characters'],
        required: true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)