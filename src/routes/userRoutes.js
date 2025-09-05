const express = require('express');
const router = express.Router();

const { listUsers } = require('../controllers/usuariosController');
const { findUserById } = require('../controllers/usuariosController');

router.get('/', listUsers);
router.get('/:id', findUserById);

module.exports = router;
