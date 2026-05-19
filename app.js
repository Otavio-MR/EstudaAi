const express = require('express');
const cors = require('cors');
const mongoose =  require('mongoose');

require('dotenv').config();

const app = express()

app.use(cors());
app.use(express.json())

const subjectRoutes = require('./routes/subjectRoutes')
const favoritesRoutes = require('./routes/favoriteRoutes')
const notesRoutes = require('./routes/notesRoutes')

app.use(subjectRoutes);
app.use(favoritesRoutes);
app.use(notesRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("Conexão realizada!")
  app.listen(3000, ()=>{
    console.log("Rodando na Porta 3000!")
  })
}).catch((error)=>{
  console.log("Erro ao tentar rodar no banco de dados")
})