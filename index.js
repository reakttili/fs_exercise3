const express = require('express')
const app = express()
const personsRouter = require('./controllers/persons')
const persons = require('./db.json');
app.use('/api/persons', personsRouter)

//http://localhost:3001/info



app.get('/info', (req, res) => {
  const date = new Date();
  const number = persons.persons.length;
  res.send('<div>Puhelinluettelossa on '+number+' henkilön tiedot<\div>'+ date)
  
  
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
