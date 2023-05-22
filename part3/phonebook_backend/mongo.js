const mongoose = require("mongoose");
let output = null;

if (process.argv.length < 3) {
  console.log("input must be > node mongo.js password [name] [number]");
  process.exit(1);
}

if (process.argv.length === 3) {
  output = "GET_ALL";
}

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
  let log;
  Person.find({}).then((result) => {
    result.forEach((person) => {
      log += `${person.name} ${person.number}\n`;
    });
    mongoose.connection.close();

    console.log(`phonebook:\n${log}`);
  });
}

switch (output) {
  case "GET_ALL":
    getAll();
    break;

  default:
    break;
}
