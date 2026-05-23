const Favorite = require('../model/Favorites')

const createFavorite = async (req, res) => {
   
    try{
        const {subjectId} = req.body;
        const favorite = await Favorite.create({subjectId});
        if(!favorite){
            return res.status(400).json({message:"Não foi posssível criar um favorito, pois ele já existe!", favorite: favorite})
        }
        res.status(201).json(favorite);
    }catch(error){
        res.status(500).json({ 
            message:'Não foi possível favoritar!',
           error: error.message
        })
    }

}; 

const getFavorites = async (req, res) => {
    
    try{
        const favorite = await Favorite.find();
        res.status(200).json(favorite);
    }
    catch(error){
        res.status(500).json({
            message: 'Erro ao realizar a busca',
            error: error.message
        });
    }


};

const deletefavoritesbyId = async (req, res) => { 
    try{
        const id = req.params.id;
        const favorite = await Favorite.findByIdAndDelete(id);
        if(!favorite){
            return res.status(404).json({message:'Favorito não encontrado'});
        }
        res.status(200).json({message:'favorito removido'});
    }catch(error){
        res.status(500).json({message:'Erro ao deletar os favoritos', error: error.message});
    }
}

const updatefavoritesbyId = async (req, res) => {
    try{
        const id = req.params.id;
        const {concluido} = req.body;
        const favorite = await Favorite.findByIdAndUpdate(
            id,{
                concluido
            },{
                new: true
            }
        );
        if (!favorite){
            return res.status(404).json({message:'favorito não encontrado!'});
        }
        res.status(200).json(favorite);
    }catch(error){
        res.status(500).json({message:'Erro ao alterar os favoritos!', error: error.message});
    }
    
}

module.exports = {
    createFavorite,
    getFavorites,
    deletefavoritesbyId,
    updatefavoritesbyId
}