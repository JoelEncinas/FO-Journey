const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();

const Person = require("./models/person");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (req, res) => {
  Person.find()
    .then((persons) => {
      res.status(200).json(persons);
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person);
    })
    .catch((error) => {
      next(error);
    });
});

const getDate = () => {
  const options = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  const currentDate = new Date();
  return currentDate.toLocaleString("en-US", options);
};

app.get("/info", (req, res) => {
  Person.find()
    .then((persons) => {
      res.status(200).send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${getDate()}</p>
      `);
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  const person = {
    name: name,
    number: number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

app.use(errorHandler);

const PORT = 3001 || process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
