const express = require("express");
let morgan = require("morgan");
const cors = require('cors')
morgan.token("type", function (req, res) {
  return req.headers.host;
});
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
const app = express();

app.use(express.json());
app.use(cors())
app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :body")
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
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  const now = new Date();
  response.send(
    `<div>Phonebook has info for ${persons.length} people <div> <div>${now}</div> `
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  if (!request.body.name) {
    return response.status(400).json({ error: "name missing" });
  } else if (!request.body.number) {
    return response.status(400).json({ error: "number missing" });
  }
  const existPerson = persons.find(
    (person) => person.name === request.body.name
  );
  if (existPerson) {
    return response.status(400).json({ error: "name already exist" });
  }
  const randomId = Math.floor(Math.random() * 100);
  const newPerson = {
    id: randomId,
    name: request.body.name,
    number: request.body.number,
  };

  persons = persons.concat(newPerson);

  response.json(newPerson);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
