const { query } = require('../../db');

// Listar todos os usuários
const listUsers = async (req, res) => {
  try {
    const result = await query('SELECT * FROM users');
    res.json({
      data: result.rows,
      message: 'Users listed successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error on list users'
    });
  }
};

// Buscar usuário por ID
const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'User ' + id + ' not found'
      });
    }

    res.json({
      data: result.rows[0],
      message: 'User ' + id + ' found successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error on find user'
    });
  }
}

// Criar novo usuário
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const result = await query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    res.status(201).json({
      message: 'User created successfully!',
      data: result.rows[0]
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({
        message: 'Email already registered!'
      });
    }
    res.status(500).json({
      message: 'Error on create user'
    });
  }
};

// Atualizar usuário
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const result = await query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'User ' + id + ' not found'
      });
    }

    res.json({
      message: 'User ' + name + ': updated successfully!',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error on update user'
    });
  }
};


// Deletar usuário
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'User ' + id + ' not found'
      });
    }
    res.json({
      message: 'User ' + id + ' deleted successfully!',
      data: result.rows[0]
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error on delete user'
    });
  }
};

module.exports = { listUsers, findUserById, createUser, updateUser, deleteUser };