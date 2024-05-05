const connection = require('../db');

exports.addUser = (req, res) => {
  const { username, email } = req.body;
  const INSERT_USER_QUERY = `INSERT INTO users (username, email) VALUES (?, ?)`;
  connection.query(INSERT_USER_QUERY, [username, email], (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ error: 'Error inserting user' });
      return;
    }
    res.json({ message: 'User inserted successfully' });
  });
};

exports.getAllUsers = (req, res) => {
  const GET_USERS_QUERY = `SELECT * FROM users`;
  connection.query(GET_USERS_QUERY, (err, results) => {
    if (err) {
      console.error('Error retrieving users:', err);
      res.status(500).json({ error: 'Error retrieving users' });
      return;
    }
    res.json(results);
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  const DELETE_USER_QUERY = `DELETE FROM users WHERE id = ?`;
  connection.query(DELETE_USER_QUERY, [userId], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Error deleting user' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  });
};
