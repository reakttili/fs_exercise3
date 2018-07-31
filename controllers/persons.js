const personsRouter = require('express').Router()
const personsdict = require('./db.json');
const Person = require('./../models/person')

module.exports = personsRouter

personsRouter.delete('/:id', (request, response) => {
  console.log("@DELETE")
  const filteredList = personsdict.persons.filter(item => Number(item.id) != Number(request.params.id))
  personsdict.persons = filteredList;
  response.json(personsdict.persons)  
})

// async not yet needed!
personsRouter.get('/', async (request, response) => {
  console.log("@GET")
  Person
    .find({})
    .then(persons => {
      let p = persons.map(Person.formatPerson)
      console.log(p)
      response.json(p)
      })
    .catch(error => console.log(error))
})


personsRouter.post('/', async (request, response) => {
  console.log("@POST")
  const name = request.body.name;
  const number = request.body.number
  // newPerson = {
  //   "name": name,
  //   "number": number,
  //   "id": Math.random()*55555555
  // }
  // WITHOUT DB
  // if (personsdict.persons.find(p => p.name === name)) {
  //  return response.status(400).json({ error: 'name already added' })
  // }
   
  // if (!name) {
  //   return response.status(400).json({ error: 'name missing' })
  // }
  // if (!number) {
  //   return response.status(400).json({ error: 'number missing' })
  // }
  // personsdict.persons = personsdict.persons.concat(newPerson)
  // console.log(personsdict.persons)
  //response.json(newPerson)

  const person =  new Person({
    "name": request.body.name,
    "number": request.body.number
  })

  person
    .save()
    .then(result =>
    {
      response.json(Person.formatPerson(result))
    })
    .catch(error => {
      console.log(error)
    })
})

personsRouter.get('/:id', async (request, response) => {
  console.log("@GET ID")
  try {
    const persons = personsdict.persons  
    const selected = persons[request.params.id-1];
    if (selected) {
      response.json(persons[request.params.id-1])  
    } else {
      response.status(400).json({ error: 'malformatted id' })  
    }
  } catch (exception) {
    console.log(exception)
    response.status(400).json({ error: 'malformatted id' })
  }
})