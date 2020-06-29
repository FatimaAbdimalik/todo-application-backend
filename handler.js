const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const { response } = require("express");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "todo",
});

/// Get tasks

app.get("/tasks", function (req, res) {
  const query = "SELECT * FROM MyTasks";
  connection.query(query, function (error, data) {
    if (error) {
      console.log("Error fetching tasks", error);
      res.status(500).json({
        error: error,
      });
    } else {
      res.status(200).json({
        MyTasks: data,
      });
    }
  });
});

// Posting Data...Adding

app.post("/tasks", function (req, res) {
  const query =
    "INSERT INTO MyTasks (text, date, completed, userId) VALUES(?,?,?,?);";
  connection.query(
    query,
    [req.body.text, req.body.date, req.body.completed, req.body.userId],
    function (error, data) {
      if (error) {
        console.log("Error adding a task", error);
        res.status(500).json({
          error: error,
        });
      } else {
        res.status(201).json({
          MyTasks: data,
        });
      }
    }
  );
});

app.put("/tasks/:id", function (req, res) {
  const taskId = req.params.id;
  const completed = req.body.completed;
  const query = "UPDATE MyTasks SET completed=? WHERE taskId = ?;";
  connection.query(query, [completed, taskId], function (error, data) {
    if (error) {
      console.log("Error updating a task", error);
      res.status(500).json({
        error: error,
      });
    } else {
      res.status(200).json({
        result: "Task updated",
      });
    }
  });
});

/// Delete

app.delete("/tasks/:id", function (req, res) {
  const taskId = req.params.id;
  const query = "DELETE FROM MyTasks WHERE taskId = ?;";
  connection.query(query, taskId, function (error, data) {
    if (error) {
      console.log("Error deleting a task", error);
      res.status(500).json({
        error: error,
      });
    } else {
      res.status(200).json({
        result: "success",
      });
    }
  });
});

module.exports.tasks = serverless(app);
