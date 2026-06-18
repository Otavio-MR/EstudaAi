const mongoose = require("mongoose");

//model responsável pelas matérias favoritas e dar um estado a elas concluído/não concluído
const StudyingSchema = new mongoose.Schema(
    {   
    nome:{
        type: String,
        required: true
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