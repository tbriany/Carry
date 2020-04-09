const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/helpers.js');
const passport = require('../auth/passport.js');
const customerQueries = require('../queries/customersQueries');

router.post('/signup', async (req, res, next) => {
  try {
    const { firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password } = req.body;
    const password_digest = await authHelpers.hashPassword(password);
    const response = await customerQueries.addCustomer({ firstname, lastname, phone_number, email, address, city, state, zip_code, avatar_url, password_digest });
    res.status(200).json({
        status: "success",
        message: `Customer ${response.customer_id} successfully registered`,
        payload: response
    });
} catch (err) {
    console.log("ERROR", err)
}
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  try {
    res.status(200)
    .json({
        payload: req.customer,
        message: "User sucessfully logged in.",
        error: false,
    })
  }
  catch(err){
    res.json({
      error: err
    })
  }
});
// //adds middleware form passport thats going to take in username & password and compare them and sucessfully logs them in

// router.get('/logout', (req, res, next) => {
//     res.send('/logout route')
//   });

module.exports = router;