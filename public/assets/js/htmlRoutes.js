app.get("*", function (req, res) {
  res.json(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.json(path.join(__dirname, "/public/notes.html"));
});
