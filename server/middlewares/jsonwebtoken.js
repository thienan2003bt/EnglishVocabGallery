const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const EXPIRE_IN = process.env.EXPIRE_IN;

const verifyToken = (token) => {
    let data = null;

    try {
        data = jwt.verify(token, JWT_SECRET_KEY);
    } catch (error) {
        console.log("Error verifying token: " + error.message);
    }

    return data;
}

const signToken = (payload) => {
    let token = '';

    try {
        token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: EXPIRE_IN });
    } catch (error) {
        console.log("Error signing token: " + error.message);
    }

    return token;
}



const JWTMiddleware = {
    verifyToken,
    signToken,

}

module.exports = JWTMiddleware;