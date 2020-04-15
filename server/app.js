const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('./auth/passport');
const { loginRequired } = require('./auth/helpers');

const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const customersRouter = require('./routes/customers');
const storesRouter = require('./routes/stores');
const couriersRouter = require('./routes/couriers');
const ordersRouter = require('./routes/orders');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(session({
    secret: 'NOT_A_GOOD_SECRET',
    resave: false,
    saveUninitialized: true
  }))
  
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter);
app.use('/products', loginRequired, productsRouter);
app.use('/customers', loginRequired,customersRouter);
app.use('/stores', loginRequired, storesRouter);
app.use('/couriers', loginRequired, couriersRouter);
app.use('/orders', loginRequired, ordersRouter);

app.use("*", (req, res) => {
    res.status(404).send('Error: no such route found. Try again.');
});

module.exports = app;
