// Dependencies
const express = require("express");
const fs = require("fs");
const database = require("./db/db.json");
const path = require("path");

// Define a PORT to listen on
const PORT = 3000;

// Create a server using Express
const app = express();

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================
// *******   ROUTES   *******
// ================================

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
