const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.port || 3001;
const app = express();

let notes = require("./db/db.json");


// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//POST route for creating a note
app.post("/api/notes", (req, res) => {
  const note = createNote (req.body, notes);
  res.json(note)
});

//function to create a note 
function createNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync (
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArray, 2)
  );

  return note;
};
  
app.listen(PORT, function() {
    console.log(`Server is listening on PORT: ${PORT}`);
  });