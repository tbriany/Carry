const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const customersRouter = require('./routes/customers')
const storesRouter = require('./routes/stores')
const couriersRouter = require('./routes/couriers')


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/customers',customersRouter)
app.use('/stores', storesRouter)
app.use('/couriers', couriersRouter);


app.use("*", (req, res) => {
    res.status(404).send('Error: no such route found. Try again.');
});

module.exports = app;
