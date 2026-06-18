const express = require('express');

const router = express.Router();

const {createNote, getNotes, deleteNoteById, updateNoteById} = require('../controllers/notesController');

router.post('/notes', createNote);
router.get('/notes', getNotes);
router.delete('/notes/:id', deleteNoteById);
router.patch('/notes/:id', updateNoteById);

module.exports = router;