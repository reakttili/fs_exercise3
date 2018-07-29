const mongoose = require('mongoose')
const passwordDict = require('./passwords.json');
const password = passwordDict.mongotest
const url = `mongodb://villevaltteribyman:${password}@ds139890.mlab.com:39890/people`
mongoose.connect(url, { useNewUrlParser: true, keepAlive: true, keepAliveInitialDelay: 300000 })

// Note Example
const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})
// const note = new Note({
//   content: 'HTML on helppoa',
//   date: new Date(),
//   important: true
// })
// note
//   .save()
//   .then(response => {
//     console.log('note saved!')
//     mongoose.connection.close()
//   })
const args = process.argv.slice(2);
const name = args[0]
const number = args[1]
const arglen = args.length

const Person = mongoose.model('Person', {
  name: String,
  number: String,
})
// console.log("Find persons!")
// Person
//   .find({})
//   .then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })
//   .catch(error => {
//       console.log(error)
//     }
//   )
// mongoose.connection.close()

if (arglen == 0) {
  console.log("print all..")
  Person
    .find({})
    .then(people => {
       console.log(people)
       mongoose.connection.close()
    })
    .catch(error => {
      console.log(error)
    })
  
} else if (arglen == 2) {
  console.log(`lisätään henkilö ${name} numero ${number} luetteloon`) 
  const person = new Person({
    name: name,
    number: number
  })
  person
    .save()
    .then(resp => {
      console.log("Person saved!")
      mongoose.connection.close()
    })
} else {
  mongoose.connection.close()
}



