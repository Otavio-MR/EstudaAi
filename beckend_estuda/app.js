const express = require('express');
const cors = require('cors');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rota teste
app.get('/', (req, res) => {
  res.send('Backend Estuda Aí rodando 🚀');
});

// servidor
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});