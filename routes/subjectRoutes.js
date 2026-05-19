// recebe e passa uma requisição get para buscar as matérias no banco de dados para o controller

const express = require('express');

const router = express.Router();

const {
   getSubjects,
   getSubjectsbyFocus,
   getSubjectsbyId
} = require('../controllers/subjectController');

//endpoint de da rota de buscar (GET) os assuntos 
router.get('/subjects', getSubjects);
router.get('/subjects/id/:id', getSubjectsbyId);
router.get('/subjects/:foco', getSubjectsbyFocus);

module.exports = router