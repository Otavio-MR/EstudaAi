const express = require('express');

const router = express.Router();

const {createNote} = require('../controllers/notesController');

router.post('/notes', createNote);

module.exports = router;