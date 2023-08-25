const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/notes', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

app.post('/api/notes', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const notes = JSON.parse(data);
      const newNote = req.body;
      newNote.id = Date.now(); // Adding a unique ID (timestamp-based, not ideal for production)
      notes.push(newNote);

      fs.writeFile('db.json', JSON.stringify(notes), (err) => {
        if (err) {
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.json(newNote);
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
