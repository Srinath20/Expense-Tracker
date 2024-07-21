const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const expenseRoutes = require('./routes/expenseRoutes');
const { error } = require('console');
const app = express();
const mysql = require('mysql');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);



app.use(express.json());//parses incoming requests with JSON payloads /*When a client sends a request with a Content-Type: application/json header, express.json() will parse the JSON payload and make it available on req.body. */
app.use(bodyParser.json());// same as express.json() but this comes from body-parser package.
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
//The middleware attaches a session object to the req object, which can be used to store and retrieve session data.
app.use(session({  //allows to store information about the user's session on the server-side.
  secret: 'your_secret_key', //to sign the session ID cookie.
  resave: false, //whether the session should be saved back to the session store even if it wasn't modified during the request. Here it means that the session will not be saved if it hasn't changed.
  saveUninitialized: true, //controls whether a session that is new but not modified should be saved to the session store.
}));
app.use('/api/expenses', expenseRoutes);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Srinathg99',
  database: 'expensetracker'
});

app.post('/purchase/premium',async (req,res)=>{
  try {  
    const sess = await stripe.checkout.sessions.create({
      payment_method_types:['card'],
      mode:'payment',
      line_items:req.body.items.map(item =>{
        return{
          price_data:{
            currency:'INR',
            product_data:{
              name:item.name
            },
            unit_amount:item.priceInCents
          },
          quantity:item.quantity
        }
      }),
      success_url:`${process.env.SERVER_url}/success.html`,
      cancel_url:`${process.env.SERVER_url}/cancel.html`
    })
    res.json({url:sess.url});
  } catch (e) {
    console.log(e)
    res.json(e);
  }
})
app.post('/premium', async (req, res) => {
  console.log(req.body.premium, "app.js line 60");
  if (req.body.premium === 1) {
    const user = req.session.userId;
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    console.log(user, "app.js line 61");
    let q = `UPDATE users SET premium = 1 WHERE id = ?`;
    db.query(q, [user], (err, results) => {
      if (err) {
        console.error('Error updating premium status:', err);
        return res.status(500).json({ error: 'Failed to update premium status' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      } else {
        console.log(req.session, "app.js line 69");
        res.json({ message: 'Premium status updated successfully' });
      }
    });
  } else {
    res.json({ message: "Payment failed" });
  }
});



app.listen(3000, () => {
  console.log("Server running on port 3000");
});


/* app.use((req, res, next) => {
  if (req.session && req.session.userName) {
    console.log("locals: ",res.locals)
    res.locals.welcomeMessage = `<h1 style="text-align: center; font-weight: bold;">Welcome ${req.session.userName}</h1>`;
  } else {
    res.locals.welcomeMessage = '';
  }
  next();
}); */