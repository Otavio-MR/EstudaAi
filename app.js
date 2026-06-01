const express = require('express');
const cors = require('cors');
const mongoose =  require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const studyingRoutes = require('./routes/studyingRoutes')
const notesRoutes = require('./routes/notesRoutes')

app.use('/api',notesRoutes);
app.use('/api', studyingRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("Conexão realizada!");
  app.listen(3000, ()=>{
    console.log("Rodando na Porta 3000!");
  })
}).catch((error)=>{
  console.log("Erro ao tentar rodar no banco de dados")
  process.exit(1);

})