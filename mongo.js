const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
} else if (process.argv.length > 5 || process.argv.length === 4){
    console.log('give password, name and numbers as arguments')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://fs_user:${password}@ds125945.mlab.com:25945/fullstack_puhelinluettelo`

mongoose.connect(url, {useNewUrlParser: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5){

    const nimi = process.argv[3]
    const numero = process.argv[4]
        
    const person = new Person({
        name: nimi,
        number: numero
    })
    
    person
    .save()
    .then(response => {
    console.log(`lisätään ${nimi} numero ${numero} luetteloon`)
    mongoose.connection.close()
    })
} else {

    Person
    .find({})
    .then(result => {
    console.log('Puhelinluettelo:')
    result.forEach(person => {
    console.log(person.name + " " + person.number)
    })
    mongoose.connection.close()
    })
}











