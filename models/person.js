const mongoose = require('mongoose')
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}
const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, keepAlive: true, keepAliveInitialDelay: 300000 })


//https://stackoverflow.com/questions/7419969/how-do-i-define-methods-in-a-mongoose-model
//https://stackoverflow.com/questions/36585080/how-to-add-schema-method-in-mongoose
const PersonSchema = new Schema ({
  name: String,
  number: String,
});

//http://mongoosejs.com/docs/guide.html#methods
PersonSchema.methods.formatPerson = function() {
  return {
    name: this.name,
    number: this.number,
    id: this._id
  }  
}

PersonSchema.methods.formatPerson = function() {
  return {
    name: this.name,
    number: this.number,
    id: this._id
  }  
}

// assign a function to the "statics" object of our animalSchema
PersonSchema.statics.formatPerson = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }  
};

  // var Animal = mongoose.model('Animal', animalSchema);
  // Animal.findByName('fido', function(err, animals) {
  //   console.log(animals);
  // });

  // // assign a function to the "statics" object of our animalSchema
  // animalSchema.statics.findByName = function(name, cb) {
  //   return this.find({ name: new RegExp(name, 'i') }, cb);
  // };

  // var Animal = mongoose.model('Animal', animalSchema);
  // Animal.findByName('fido', function(err, animals) {
  //   console.log(animals);
  // });

const Person = mongoose.model('Person', PersonSchema)

// Person.findOne({ _id: "5b5e0ff3b47815258c3c439a" }).exec(function (error, something) {
//   console.log(something.formatPerson());
// });

// Person
//   .findOne({ _id: "5b5e0ff3b47815258c3c439a" })
//   .then(person =>
//     {console.log(person.formatPerson())          
//   })


module.exports = Person