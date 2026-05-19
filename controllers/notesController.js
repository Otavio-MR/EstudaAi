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
}; module.exports = {
    createNote
}