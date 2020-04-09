const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePasswords } = require('./helpers');
const customerQueries = require('../queries/customersQueries');

passport.use(new LocalStrategy(async (email, inputPassword, done) => {
    try {
        const customer = await customerQueries.getCustomerByEmail(email);
        if (!customer) {
            return done(null, false);
        }
        const customerPassword = customer.password;
        const passMatch = await comparePasswords(inputPassword, customerPassword);
        if (!passMatch) {
            return done(null, false)
        };
        delete customerPassword;
        done(null, customer);
    }
    catch (err) {
        done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser(async (user, done) => {
  try {
    let retrievedUser = await customerQueries.getCustomerByEmail(user.email);
    delete retrievedUser.password;
    done(null, retrievedUser)
  }
  catch(err){
    done(err, false)
  }
});

module.exports = passport;