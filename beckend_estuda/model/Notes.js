const mongoose = require("mongoose")

//classe responsável por criar um "bloco de notas" do usuário
const NotesSchema = new mongoose.Schema({

    titulo:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    date:{
        type: Date
    }

})

// exporto a classe para que possa ser usada em outros lugares
module.exports = mongoose.model("Notes", NotesSchema);