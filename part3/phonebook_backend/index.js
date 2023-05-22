const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.static('build'))
app.use(cors());
app.use(express.json());

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).end();
  }
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
  res.status(200).send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${getDate()}</p>
    `);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  let checkDuplicate = persons.filter((person) => person.name === body.name);
  if (checkDuplicate.length > 0) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: parseInt(Math.random() * 10000),
  };

  persons = persons.concat(person);

  res.status(200).json(person);
});

const PORT = 3001 || process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
