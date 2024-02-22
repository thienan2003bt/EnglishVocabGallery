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



const UserController = {
    handleLogin,
    handleSignup,
}

module.exports = UserController;
