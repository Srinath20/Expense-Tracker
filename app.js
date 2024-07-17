const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const expenseRoutes = require('./routes/expenseRoutes');
const app = express();
const en = require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

/* app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
})); */

app.use((req, res, next) => {
  if (req.session && req.session.userName) {
    res.locals.welcomeMessage = `<h1 style="text-align: center; font-weight: bold;">Welcome ${req.session.userName}</h1>`;
  } else {
    res.locals.welcomeMessage = '';
  }
  next();
});

app.use('/api/expenses', expenseRoutes);
app.use('/purchase',expenseRoutes);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});