const express = require('express');
const router = express.Router();

const { listUsers } = require('../controllers/usuariosController');

router.get('/', listUsers);

module.exports = router;
