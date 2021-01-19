// Dependencies
const express = require("express");
const fs = require("fs");
const database = require("./db/db.json");
const path = require("path");
const { json } = require("express");
const { parse } = require("path");

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

// Receives a new note to save on the request body, adds it to the db.json file,
// and then returns the new note to the client.
app.post("/api/notes", function (req, res) {
  // Receive a new note to save on the request body
  const newNote = req.body;
  // Add it to the db.json file
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "application/json" });
    let parsedData = JSON.parse(data);
    parsedData.push(newNote);
    // Adds an ID to each object
    parsedData.forEach((item, i) => {
      item.id = i + 1;
    });
    let stringifiedData = JSON.stringify(parsedData);
    res.end(stringifiedData);
    // Put the new note object into db.json
    fs.writeFile("./db/db.json", stringifiedData, (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
  });
  // Return the new note to the client
});

// Should receive a query parameter containing the id of a note to delete.
app.delete("/api/notes/:id", function (req, res) {
  const noteID = req.params.id;

  // Add it to the db.json file
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "application/json" });
    let parsedData = JSON.parse(data);
    for (let i = 0; parsedData.length; i++) {
      if (noteID === parsedData[i].id) {
        parsedData.splice(parsedData[i]);
      }
    }

    let stringifiedData = JSON.stringify(parsedData);
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
