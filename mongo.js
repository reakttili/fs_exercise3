const mongoose = require('mongoose')
const passwordDict = require('./passwords.json');
const password = passwordDict.mongotest
const url = `mongodb://villevaltteribyman:${password}@ds139890.mlab.com:39890/people`
mongoose.connect(url)

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

const note = new Note({
  content: 'HTML on helppoa',
  date: new Date(),
  important: true
})

note
  .save()
  .then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })