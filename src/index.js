const express = require("express");
require("./db/mongoose");
const Task = require("./models/task");

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.post("/api/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.get("/api/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
