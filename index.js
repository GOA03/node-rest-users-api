// Carregar variáveis de ambiente
require('dotenv').config();

// Importar dependências
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const pg = require('pg');

// Criar aplicativo Express
const app = express();

// Configurações
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Rotas de teste
app.get('/', (req, res) => {
    res.json({
        message: 'API working!',
        endpoints: {
            users: '/api/users',
            user: '/api/users/:id',
        }
    });
});

// Importar rotas de usuários
const userRoutes = require('./src/routes/userRoutes');
app.use('/api/users', userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
