var path = require("path");
var express = require("express");

var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML ROUTES
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//API ROUTES
var notesData = require("./db/db.json");
//GET
app.get("/api/notes", function (req, res) {
  res.json(notesData);
});
//POST
app.post("/api/notes", function (req, res) {
  if (notesData) {
    notesData.push(req.body);
    res.json(true);
  }
});

//DELETE
app.post("/api/notes/:id", function (req, res) {});

app.listen(PORT, function () {
  console.log("App listening on PORT" + PORT);
});
