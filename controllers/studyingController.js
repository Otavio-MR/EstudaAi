const mongoose = require('mongoose');
const Studying = require('../model/Studying');

const createStudying = async (req,res) => {
    try{
        const {subjectId, foco} = req.body;
        const existing = await Studying.findOne({subjectId});
        if(existing){
            res.status(400).json({message:'Não foi possível favoritar a matéria'})
        }
        const studying = await Studying.create({subjectId, foco});
        res.status(201).json(studying);
    }catch(error){
        res.status(500).json({message:'Falha ao criar favorito!', error: error.message});
    }
}

const getStudying = async (req, res) => {
    try{
        const studying = await Studying.find();
        if(studying.length == 0){
           return res.status(404).json('Nenhum favorito foi adicionado ainda');
        }
        res.status(200).json(studying);
    } catch(error){
        res.status(500).json({message:'Erro ao pegar os favoritos!', error: error.message});
    }
}

const updateStudyingById = async (req,res) => {
        try{
            const {id} = req.params;
            const {favoritado, concluido} = req.body;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message:'Id inválido'})
            }
            const studying = await Studying.findByIdAndUpdate(
                id, {favoritado, concluido} , {new: true}
            );
            if(!studying){
                return res.status(404).json({message:'Matéria não foi encontrado!'})
            }
            res.status(200).json(studying);
        }catch(error){
            res.status(500).json({
                message: 'Erro ao atualizar matéria',
                error: error.message
            });
        }
};


const deleteStudyingById = async (req, res) => {
        try{
            const {id} =  req.params;
            if(!mongoose.Types.ObjectId.isValid(id)){
               return res.status(400).json({message:'ID inválido'});
            }
            const studying = await Studying.findByIdAndDelete(id);
            if(!studying){
               return res.status(404).json({message:'Nenhuma matéria para deletar foi encontrada!'})
            }
            res.status(200).json(studying)
        }catch(error){
            res.status(500).json({message:'Erro ao deletar matéria!', error: error.message})
        }
    }

module.exports = {
    createStudying,
    updateStudyingById,
    deleteStudyingById,
    getStudying
}    