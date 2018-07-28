const personsRouter = require('express').Router()
const persons = require('./db.json');

module.exports = personsRouter

// async not yet needed!
personsRouter.get('/', async (request, response) => {
  
  response.json(persons)
})