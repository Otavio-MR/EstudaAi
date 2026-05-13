//assuntos dos focos de cada matéria

const mongoose = require("mongoose");

const SubjectSchema =  new mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    foco:{
        type: String,
        enum: ["vestibular", "enem", "concurso"],
        require: true
    },
    resumo:{
        type: String,
        require: String

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