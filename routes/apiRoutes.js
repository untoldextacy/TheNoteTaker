const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const dbPath = path.join(__dirname, '../db/db.json');

// to fetch all notes

router.get('/notes', (req,res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if(err) {
            res.status(500).json({ error: 'Failed! Cannot read notes!'});
        } else {
            res.json(JSON.parse(data));
        }
    }); 
});

// making notes

router.post('/notes', (req, res) => {
    const newNote = { id:uuidv4(), title: req.body.title, text: req.body.text };
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(newNote);
        });
    });
});

// to delete

router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      const notes = JSON.parse(data);
      const filteredNotes = notes.filter(note => note.id !== noteId);
      fs.writeFile(dbPath, JSON.stringify(filteredNotes), (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(204).send();
      });
    });
  });
  
// exports data

  module.exports = router;
  