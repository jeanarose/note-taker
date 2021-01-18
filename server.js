// Dependencies
const express = require("express");
const fs = require("fs");
const database = require("./db/db.json");
const path = require("path");

// Define a PORT to listen on
const PORT = process.env.PORT || 3000;

// Create a server using Express
const app = express();

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// *******   ROUTES   *******

// Route that returns the index.html file
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Route that returns the notes.html file.
app.get("/public/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log(`App listening on PORT " + ${PORT}.`);
});

// *******   API ROUTES   *******
// Should read the db.json file and return all saved notes as JSON.
// GET /api/notes
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  });
});

// Displays all characters
// app.get("/api/characters", function (req, res) {
//   return res.json(characters);
// });

// Should receive a new note to save on the request body, add it to the db.json file,
// and then return the new note to the client.
// POST /api/notes

// Should receive a query parameter containing the id of a note to delete.
// This means you'll need to find a way to give each note a unique id when it's saved.
// In order to delete a note, you'll need to read all notes from the db.json file, remove
// the note with the given id property, and then rewrite the notes to the db.json file.
// DELETE /api/notes/:id
