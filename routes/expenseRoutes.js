const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const userController = require('../controllers/userController');
const purchaseController = require('../controllers/purchaseController');

router.get('/', expenseController.getAllExpenses);
router.post('/', expenseController.createExpense);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

router.post('/user/signup', userController.signupUser);
router.post('/user/login', userController.loginUser);


//purchase/premiummembership
router.get('/premiummembership', purchaseController.purchasepremium);
router.post('/updatetransactionstatus', purchaseController.updateTransactionStatus);

/*
router.get('/premiummembership',authenticatemiddleware.authenticate,purchaseController.purchasepremium); // purchasepremium was not suggested
router.post('/updatetransactionstatus',authenticatemiddleware.authenticate,purchaseController.updateTransactionstatus);
*/
module.exports = router;