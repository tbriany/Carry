const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/helpers.js');
const passport = require('../auth/passport.js');
const customerQueries = require('../queries/customersQueries');
const { handleErrors } = require('../helpers/helpers')

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  try {
    res.status(200)
    .json({
        payload: req.customer,
        message: 'User sucessfully logged in.',
        error: false,
    })
  }
  catch(err){
    handleErrors(res, err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password } = req.body;
    const password_digest = await authHelpers.hashPassword(password);
    const response = await customerQueries.addCustomer({ firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password_digest });
    res.status(200).json({
        status: 'Success',
        message: `Customer ${response.customer_id} successfully registered`,
        payload: response
    });
} catch (err) {
  handleErrors(res, err);
}
});

router.get('/logout', (req, res, next) => {
    req.logOut();
    res.status(200)
    .json({
      payload: null,
      message: "User successfully logged out",
      error: false
    })
  });

module.exports = router;