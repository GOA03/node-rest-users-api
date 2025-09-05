const express = require('express');
const router = express.Router();

const { listUsers } = require('../controllers/usuariosController');
const { findUserById } = require('../controllers/usuariosController');
const { createUser } = require('../controllers/usuariosController');
const { updateUser } = require('../controllers/usuariosController');
const { deleteUser } = require('../controllers/usuariosController');

router.get('/', listUsers);
router.get('/:id', findUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
