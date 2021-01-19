// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const {v4:uuidv4} = require("uuid");

// Define a PORT to listen on
const PORT = process.env.PORT || 3000;

// Create a server using Express
const app = express();

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// *******   API ROUTES   *******

// Reads the db.json file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  });
});

// Adds a new note to the page
app.post("/api/notes", function (req, res) {
  const newNote = req.body;
  newNote.id = uuidv4();

  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "application/json" });
    let parsedData = JSON.parse(data);
    parsedData.push(newNote);
    let stringifiedData = JSON.stringify(parsedData);
    res.end(stringifiedData);

    fs.writeFile("./db/db.json", stringifiedData, (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
  });
  res.json(newNote);
});

// Deletes a note from the page
app.delete("/api/notes/:id", function (req, res) {
  const noteID = req.params.id;

  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    let parsedData = JSON.parse(data);
    const newData = parsedData.filter((note) => {
      console.log(note.id, noteID)
      return note.id !== noteID;
    });
    console.log(newData);
    for (let i = 0; i < parsedData.length; i++) {
      if (noteID === parsedData[i].id) {
      }
    }

    let stringifiedData = JSON.stringify(newData);
    res.end(stringifiedData);

    fs.writeFile("./db/db.json", stringifiedData, (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
  });
});

// *******   HTML ROUTES   *******

// Returns the notes.html file.
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Returns the index.html file
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log(`App listening on PORT ${PORT}.`);
});
