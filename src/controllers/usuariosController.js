const { query } = require('../../db');

// Listar todos os usuários
const listUsers = async (req, res) => {
  try {
    const result = await query('SELECT * FROM users');
    res.json({
      success: true,
      data: result.rows,
      message: 'Users listed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error on list users'
    });
  }
};

module.exports = { listUsers };
