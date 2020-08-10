const mongoose = require('mongoose')
// change this to use env variable
const url =
  `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0-pvd0w.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Contact', contactSchema);

