// Dependencies
const express = require("express");
const fs = require("fs");
const database = require("./db/db.json");
const path = require("path");
const { json } = require("express");

// Define a PORT to listen on
const PORT = process.env.PORT || 3000;

// Create a server using Express
const app = express();

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// *******   HTML ROUTES   *******

// Returns the index.html file
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Returns the notes.html file.
app.get("/public/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// *******   API ROUTES   *******
// Reads the db.json file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  });
});

// Receives a new note to save on the request body, adds it to the db.json file,
// and then returns the new note to the client.
app.post("/api/notes", function (req, res) {
  // Receive a new note to save on the request body
  const newNote = req.body;
  console.log(newNote);
  // Add it to the db.json file
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "application/json" });
    const parsedData = JSON.parse(data);
    parsedData.push(newNote);
    console.log(parsedData);
    const stringifiedData = JSON.stringify(parsedData);
    res.end(stringifiedData);
  });
  // Return the new note to the client
});

// Create New Characters - takes in JSON input
app.post("/api/characters", function (req, res) {
  var newCharacter = req.body;

  console.log(newCharacter);

  characters.push(newCharacter);

  res.json(newCharacter);
});

// Should receive a query parameter containing the id of a note to delete.
// This means you'll need to find a way to give each note a unique id when it's saved.
// In order to delete a note, you'll need to read all notes from the db.json file, remove
// the note with the given id property, and then rewrite the notes to the db.json file.
// DELETE /api/notes/:id

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log(`App listening on PORT " + ${PORT}.`);
});
