const JWTMiddleware = require('../middlewares/jsonwebtoken');


const nonSecurePaths = ['/', '/login', '/logout', '/signup', '/account', '/about', '/contact'];

const extractTokenFromRequest = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }

    return req.query?.token;
}


const checkUser = async (req, res, next) => {
    try {
        console.log("Have reached the check user logic");
        let pathName = '/' + req.baseUrl.split('/').slice(-1);
        console.log("Req pathName: " + pathName);
        if (nonSecurePaths.includes(pathName) && pathName !== '/account') {
            return next();
        }

        let token = req.cookies.accessToken ? req.cookies.accessToken : extractTokenFromRequest(req);
        if (token) {
            let decoded = JWTMiddleware.verifyToken(token);
            if (decoded) {
                req.user = decoded;
                req.accessToken = token;

                return next();
            } else {
                return res.status(401).json({
                    errCode: '-2',
                    errMsg: 'Unauthenticated user',
                    data: null,
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            errCode: '-2',
            errMsg: 'Service error: ' + error.message,
            data: null,
        })
    }
}

const AuthController = {
    checkUser,
}


module.exports = AuthController;