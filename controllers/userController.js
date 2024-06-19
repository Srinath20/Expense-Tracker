const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Srinathg99',
  database: 'expensetracker'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database.');
});

exports.signupUser = (req, res) => {
  const { name, email, password } = req.body;
  const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailSql, [email], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      return res.status(400).json({ error: 'Email already taken' });
    } else {
      const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.query(sql, [name, email, password], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, name, email });
      });
    }
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ error: 'Email not found. Please signup if new user.' });
    } else {
      const user = results[0];
      if (user.password === password) {
        res.json({ id: user.id, name: user.name, email: user.email });
      } else {
        res.status(400).json({ error: 'Wrong password entered, please check' });
      }
    }
  });
};
