//Dependencies
var path = require("path");
var express = require("express");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//HTML Route
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});
//Parse notes
var notesData = fs.readFileSync(path.join(__dirname, "db", "db.json"));
var parsedNotes = JSON.parse(notesData);
//API Route-Displays notes
app.get("/api/notes", function (req, res) {
  const notes = [];
  parsedNotes.forEach(function (note) {
    notes.push(note);
  });
  res.json(notes);
});

//HTML Route
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
//Creates a new note, taking in JSON input
app.post("/api/notes", function (req, res) {
  var newNote = req.body;

  newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();
  parsedNotes.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "db", "db.json"),
    JSON.stringify(parsedNotes)
  );
  res.json(newNote);

  console.log(newNote);
});

//Deletes any new note.
app.delete("/api/notes/:id", function (req, res) {
  parsedNotes = parsedNotes.filter((note) => note.id !== req.params.id);
  fs.writeFileSync(
    path.join(__dirname, "db", "db.json"),
    JSON.stringify(parsedNotes)
  );
  res.json(parsedNotes);
});

//Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT" + PORT);
});
