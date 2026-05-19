const Subject = require('../model/Subjects');

const getSubjects = async (req, res)=> {

    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    }catch(error){
        res.status(500).json({
            message: 'Um erro inesperado aconteceu ao buscar matérias!',
            erro: error.message
        })
    }

}

const getSubjectsbyFocus = async(req,res)=> {

    try{
        const foco = req.params.foco;

        const subjects = await Subject.find(
            {foco: foco}
        );
        res.status(200).json(subjects);
    }catch(error){
        res.status(500).json({
            message: "Um erro inesperado aconteceu ao tentar buscar matérias por foco",
            erro: error.message
        });
    }

}

const getSubjectsbyId = async (req, res) => {
   
    const id = req.params.id
    const subject = await Subject.findById(id)

    if (!subject){
       
        return res.status(404).json( {message: 'Matéria não encontrada'})
    
    }res.status(200).json(subject)
    
}
module.exports = {
    getSubjects,
    getSubjectsbyFocus,
    getSubjectsbyId
}