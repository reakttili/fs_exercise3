const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const personsRouter = require('./controllers/persons')
const persons = require('./db.json');

app.use(bodyParser.json())
//app.use(morgan('tiny'))
app.use(getContent)
app.use(morgan(':data :method :url :response-time'))

morgan.token('data', function getId (req) {
  return JSON.stringify(req.extra)
})

function getContent (req, res, next) {
  req.extra = req.body
  next()
}

app.use('/api/persons', personsRouter)

app.get('/info', (req, res) => {
  const date = new Date();
  const number = persons.persons.length;
  res.send('<div>Puhelinluettelossa on '+number+' henkilön tiedot<\div>'+ date)
  
  
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
