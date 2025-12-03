const express = require('express');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', productRoutes); 

app.get('/', (req, res) => {
    res.json({ message: 'API da Loja Bosque Mágico (Node) rodando!' });
});

app.use('/images', express.static('public/images')); 

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});