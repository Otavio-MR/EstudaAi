const mongoose =  require('mongoose');

const FavoritesSchema =  new mongoose.Schema(
    {
    subjectId:{
        type: String,
        required: true 
    },

    concluido:{
        type: Boolean,
        default: false
    }
}, 
    {
    timesTamps: true
    
    
}); module.exports = mongoose.model('Favorite', FavoritesSchema);