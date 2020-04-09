const bcrypt = require('bcrypt');

const hashPassword = async(password) => {
    try {
        const salt = await bcrypt.genSalt(12);
        const password_digest = await bcrypt.hash(password, salt);
        return password_digest;
    }
    catch(err) {
        throw err;
    }
};

const comparePassword = async (candidatePassword, passwordDigest) => {
    try {
        const match = await bcrypt.compare(candidatePassword, passwordDigest);
        return match;
    }
    catch(err){
        throw err;
    }
};

const loginRequired = (req, res, next) => {
    if(req.user) {
        return next();
    }
    else {
        res.status(401)
        .json({
            payload: null,
            message: "You must be logged in to access Carry",
            error: true,
        })
    }
};

module.exports = {
    hashPassword,
    comparePassword,
    loginRequired
};