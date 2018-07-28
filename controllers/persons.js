const personsRouter = require('express').Router()
const personsdict = require('./db.json');

module.exports = personsRouter

personsRouter.delete('/:id', (request, response) => {
  const filteredList = personsdict.persons.filter(item => Number(item.id) != Number(request.params.id))
  personsdict.persons = filteredList;
  response.json(personsdict.persons)  
})

// async not yet needed!
personsRouter.get('/', async (request, response) => {
  
  response.json(personsdict.persons)
})

personsRouter.get('/:id', async (request, response) => {
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