// Dependencies
const express = require("express");
const fs = require("fs");
const database = require("./db/db.json");

// Define a PORT to listen on
const PORT = 3000;

// Create a server using Express
const app = express();

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
