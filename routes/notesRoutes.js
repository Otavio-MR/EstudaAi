const express = require('express');

const router = express.Router();

const {createNote, getNotes, deletenotebyId, updateNoteById} = require('../controllers/notesController');

router.post('/notes', createNote);
router.get('/notes', getNotes);
router.delete('/notes/:id', deletenotebyId);
router.patch('/notes/:id', updateNoteById);

module.exports = router;