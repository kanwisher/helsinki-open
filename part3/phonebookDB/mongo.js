const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
const [
    node,
    file,
    password,
    name,
    number
] = process.argv

const url =
  `mongodb+srv://admin:${password}@cluster0-pvd0w.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Contact = mongoose.model('Contact', contactSchema)

if (name && number) {

    const contact = new Contact({
        name,
        number
    })

    contact.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {

    Contact.find({}).then((result) => {
        console.log('phonebook:');
        result.forEach(({ name, number }) => {
            console.log(name, number)
        })
        mongoose.connection.close()
    })

}
