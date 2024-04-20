const UserService = require("../services/user.s");
const JWTMiddleware = require('../middlewares/jsonwebtoken');

require('dotenv').config();

const EXPIRE_IN_COOKIE = Number(process.env.EXPIRE_IN_COOKIE);

const handleLogin = async (req, res, next) => {
    try {
        let response = await UserService.handleLogin(req.body);
        if (response && response.data && parseInt(response.status) === 200) {
            let token = JWTMiddleware.signToken(response.data);

            res.cookie('accessToken', token, { httpOnly: true, maxAge: EXPIRE_IN_COOKIE });
            return res.status(response.status).json({
                ...response,
                data: {
                    account: response.data,
                    accessToken: token
                }
            });
        }
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Service error: " + error.message,
            data: null,
        });
    }
}

const handleSignup = async (req, res, next) => {
    try {
        let response = await UserService.createNewUser(req.body);
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Service error: " + error.message,
            data: null,
        });
    }
};


const readAllUsers = async (req, res, next) => {
    try {
        let response = await UserService.readAllUsers();
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Service error: " + error.message,
            data: null,
        });
    }
}

const createNewUser = async (req, res, next) => {
    try {
        let response = await UserService.createNewUser(req.body);
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Service error: " + error.message,
            data: null,
        });
    }
}

const updateUser = async (req, res, next) => {
    try {
        let response = await UserService.updateUser(req.body);
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Service error: " + error.message,
            data: null,
        });
    }
}

const deleteUser = async (req, res, next) => {
    try {
        let response = await UserService.deleteUser(req.body.id);
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Service error: " + error.message,
            data: null,
        });
    }
}

const readUserAccount = async (req, res, next) => {
    return res.status(200).json({
        status: 200,
        message: "User account is returned successfully",
        data: {
            accessToken: req.accessToken,
            account: { ...req.user },
        },
    });
}


const UserController = {
    handleLogin,
    handleSignup,
    readAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    readUserAccount,
}

module.exports = UserController;
