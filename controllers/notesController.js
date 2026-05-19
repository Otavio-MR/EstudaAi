const Note = require('../model/Notes');

const createNote = async (req, res) => {
    try{
        const {titulo, descricao} = req.body;
        const note = await Note.create({
            titulo,
            descricao
    });
        res.status(201).json(note);
    }catch(error){
            res.status(500).json({
                message: 'Falha ao criar notas',
                erro: error.message
            });
    }
};
const putNote = async (req, res) => {
    const id = req.params.id
    const {titulo, descricao} =  req.body;
    try{
        const note = await Note.findByIdAndUpdate(
            id,{titulo, descricao},{returnDocument: 'after'});
        if(!note){
            res.status(404).json({message:'Nenhuma nota para editar'});
        }else{
            res.status(201).json(note);
        }
    }catch(error){
        res.status(500).json({
            message: 'Falha ao editar a nota',
            erro: error.message
        });
    }
};

const getNotes = async (req, res) => {
    try{
        const note = await Note.find();
    res.status(200).json(note)

}catch(error){
        res.status(500).json({
            message:'Nenhuma nota foi encontrada!',
            error: error.message
        });
    }
}

const deletenotebyId = async (req, res) => {
    try{
        const id = req.params.id;
    const note = await Note.findByIdAndDelete(id)
    if(!note){
        res.status(404).json({message:'nenhuma nota para deletar!'})
    }else{
        res.status(200).json(note)
    }
    }catch{
        res.status(500).json({message:'Falha ao tentar deletar a nota!'})
    }
};


module.exports = {
    createNote,
    getNotes,
    deletenotebyId,
    putNote
};