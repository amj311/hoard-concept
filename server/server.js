const express = require('express');
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors({origin: true}));

app.get('/user/:username/id', require('./services/getUserID'));
app.get('/user/:id/account', require('./services/getAccounts'));
app.get('/user/:id/category', require('./services/getCategories'));
app.get('/user/:id/transaction', require('./services/getTransactions'));
app.post('/user', require('./services/addUser'));
app.post('/user/:id/account', require('./services/addAccount'));
app.post('/user/:id/category', require('./services/addCategory'));
app.post('/user/:id/transaction', require('./services/addTransaction'));
app.delete('/user/:id', require('./services/deleteUser'));
app.delete('/account/:id', require('./services/deleteAccount'));
app.delete('/category/:id', require('./services/deleteCategory'));
app.delete('/transaction/:id', require('./services/deleteTransaction'));

app.listen(8080);
console.log('Server listening on port 8080');

 