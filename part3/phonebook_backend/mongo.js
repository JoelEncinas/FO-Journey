const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://reactenjoyer3:${password}@cluster0.pug2uxj.mongodb.net/mongotest?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

function getAll() {
  let log = "";
  Person.find({})
    .then((result) => {
      result.forEach((person) => {
        log += `${person.name} ${person.number}\n`;
      });

      mongoose.connection.close();
      console.log(`phonebook:\n${log}`);
    })
    .catch((error) => {
      console.error("Couldn't load data");
    });
}

function addPerson(name, number) {
  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then((result) => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error("Failed to add the person");
    });
}

function exit() {
  console.log("input must be > node mongo.js password [name & number]");
  process.exit(1);
}

if (process.argv.length === 3) {
  getAll();
} else if (process.argv.length === 5) {
  addPerson(process.argv[3], process.argv[4]);
} else {
  exit();
}
