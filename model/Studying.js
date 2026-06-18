const mongoose = require("mongoose");

//model responsável pelas matérias favoritas e dar um estado a elas concluído/não concluído
const StudyingSchema = new mongoose.Schema(
    {   
    subjectId:{
        type: String,
        required: true
    },
    foco:{
        type: String,
        enum: ["enem", "vestibular", "concurso"],
        required: true
    },
    favoritado:{
        type: Boolean,
        default: false
    },
    concluido:{
        type: Boolean,
        default: false
    }
},
    {
        timestamps:true
    }
    
);

//exporta a classe model para que outras classes possam usá-lo
module.exports = mongoose.model("Studying",StudyingSchema);