const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const { response } = require("express");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", function (req, res) {
  res.status(200).send({
    tasks: [
      {
        id: 1,
        text: ["water plants", "do dishes", "buy oats"],
        status: 0,
        completed: false,
      },
    ],
  });
});

module.exports.tasks = serverless(app);

app.post("/tasks", function (req, res) {
  res.status(201).send({
    text: "buy cat fod",
    completed: false,
    date: "2019-10-07",
  });
  const text = req.body.text;
  const date = req.body.date;

  res.json({
    message: `Received a request to add task ${text} with date ${date}`,
  });
});

app.put("/tasks/:id", function (req, res) {
  const id = req.params.id;
  const data = req.body;
  res.status(200).send(`Update task ${id} and its ${data}`);
});

app.delete("/tasks/:id", function (req, res) {
  const id = req.params.id;
  const someResponse = {
    message: "You issued a delete request for ID",
  };
  res.status(200).send(someResponse);
});
