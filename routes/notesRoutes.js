const express = require('express');

const router = express.Router();

const {createNote, getNotes, deletenotebyId, putNote} = require('../controllers/notesController');

router.post('/notes', createNote);
router.get('/notes', getNotes);
router.delete('/notes/:id', deletenotebyId);
router.put('/notes/:id', putNote);

module.exports = router;