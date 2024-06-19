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
