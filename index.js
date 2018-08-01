const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const personsRouter = require('./controllers/persons')
const persons = require('./db.json');

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

