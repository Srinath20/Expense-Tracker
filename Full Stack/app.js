const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const expenseRoutes = require('./routes/expenseRoutes');
const { error } = require('console');
const app = express();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const items = [{priceInRupees:2500,name:"Buy Preium"}]


app.post('/purchase/premium',async (req,res)=>{
  try {  
    const sess = await stripe.checkout.sessions.create({
      payment_method_types:['card'],
      mode:'payment',
      line_items:req.body.items.map(item =>{
        // const storeItem = items[item]
        return{
          price_data:{
            currency:'INR',
            product_data:{
              name:item.name
            },
            unit_amount:item.priceInRupees
          },
          quantity:item.quantity
        }
      }),
      success_url:`${process.env.SERVER_url}/success.html`,
      cancel_url:`${process.env.SERVER_url}/cancel.html`
    })
    console.log(sess)
    res.json({url:sess.url});
  } catch (e) {
    console.log(e)
    res.json(e);
  }
// console.log(session.url); undefined
 
})

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.use('/api/expenses', expenseRoutes);



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