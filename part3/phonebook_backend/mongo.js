const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("input > node mongo.js password [name] [number]");
  process.exit(1);
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
