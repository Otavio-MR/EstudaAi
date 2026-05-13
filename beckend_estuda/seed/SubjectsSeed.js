require('dotenv').config();

const mongoose = require('mongoose');
const Subject = require("../model/Subjects")

const seedDatabase = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado');
        await Subject.deleteMany();
        console.log('Matérias antigas foram deletadas');
        await Subject.insertMany(subjects);
        console.log('Matérias adicionadas')
        mongoose.connection.close();
    } catch(error){
        console.log(error);
    }
}

const subjects = [{
    nome: 'Matemática',
    foco: 'enem',
    resumo: 'Estudo de funções, geometria e probabilidade',
    topicos: ['Funções', 'Geometria', 'Probalidade'],
    links: ['https://www.youtube.com/playlist?list=PL8Sb1J47vKz5roPScagXaUkk-maGYZy4c']
},
{
    nome: 'Português',
    foco: 'enem',
    resumo: 'Estudo de interpretação de Texto e Gramática',
    topicos: ['Interpretação de Texto e Gramática'],
    links: ['https://www.youtube.com/playlist?list=PL8vXuI6zmpdiy2Xhd1Tn4_q974HxDUzox']
},
{
    nome: 'Direto Constitucional',
    foco: 'concurso',
    resumo: 'Princípios Fundamentais da Constituição',
    topicos: ['Artigos', 'Direito Constitucional'],
    links: ['https://www.youtube.com/playlist?list=PLMkKssHsRBmJmfaVeTiZn3oeGbIL1qmZ5']
},
{
    nome: 'Medicina',
    foco: 'vestibular',
    resumo: 'Matérias do Ensino Médio',
    topicos: ['Matemática', 'Química', 'Português'],
    links: ['https://www.youtube.com/playlist?list=PLTPg64KdGgYivEK9avhUlxsaJhD0TfpxW']
}
    
]

seedDatabase();