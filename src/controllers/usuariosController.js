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

const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User ' + id + ' not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: 'User ' + id + ' found successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error on find user'
    });
  }
}

module.exports = { listUsers, findUserById };
