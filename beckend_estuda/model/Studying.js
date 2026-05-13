const mongoose = require("mongoose");

//model responsável pelas matérias favoritas e dar um estado a elas concluído/não concluído
const StudyingSchema = new mongoose.Schema({
    
    subjectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Subject",
        required: true
    },

    estado:{
        type: Boolean,
        default: false
    }
});

//exporta a classe model para que outras classes possam usá-lo
module.exports = mongoose.model("Studying",StudyingSchema);