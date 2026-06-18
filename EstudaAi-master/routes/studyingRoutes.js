const express = require('express');
const router = express.Router();

const {createStudying, getStudying, updateStudyingById, deleteStudyingById} = require('../controllers/studyingController')

router.post("/studying", createStudying);
router.get('/studying', getStudying);
router.patch('/studying/:id', updateStudyingById);
router.delete('/studying/:id', deleteStudyingById);