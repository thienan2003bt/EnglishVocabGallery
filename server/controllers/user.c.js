const UserService = require("../services/user.s");

const handleLogin = async (req, res, next) => {
    try {
        let response = await UserService.handleLogin(req.body);
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


const UserController = {
    handleLogin,
    handleSignup,
    readAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}

module.exports = UserController;
