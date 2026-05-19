const express = require('express');

const router = express.Router();

const{
    createFavorite,
    getFavorites,
    deletefavoritesbyId,
    updatefavoritesbyId
} =  require('../controllers/favoritesController');

router.post('/favorites', createFavorite);
router.get('/favorites', getFavorites);
router.delete('/favorites/:id', deletefavoritesbyId);
router.patch('/favorites/:id', updatefavoritesbyId);

module.exports = router