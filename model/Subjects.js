//assuntos dos focos de cada matéria

const mongoose = require("mongoose");

const SubjectSchema =  new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    foco:{
        type: String,
        enum: ["vestibular", "enem", "concurso"],
        required: true
    },
    resumo:{
        type: String,
        required: true

    },
    topicos:{
        type: [String]
    },
    links:{
        type: [String]
    }
    
}); 
//exporto a classe model dos assuntos para que possa
// ser usado em outras pastas
module.exports = mongoose.model("Subject", SubjectSchema);