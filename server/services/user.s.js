const db = require('../models/index');
const bcrypt = require('bcrypt');

//setting up variable and method
let returnedData = {
    status: 0,
    message: '',
    data: {},
};
const updateReturnedData = (status, message, data) => {
    returnedData = {
        status: status,
        message: message,
        data: data,
    };

    return returnedData;
}

// supporting methods
const validateUserDataBeforeInsertion = (userData) => {
    let isValid = true;
    const attributeArr = ['password', 'email'];

    for (let i = 0; i < attributeArr.length; i++) {
        let attribute = attributeArr[i];
        if (userData.hasOwnProperty(attribute) === false) {
            updateReturnedData(400, '', attribute);
            return false;
        }
    }

    //userData has role "Guest" by default
    if (!userData.roleID) userData.roleID = 1;

    return isValid;
}

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}

const checkPassword = (plaintPassword, hashedPassword) => {
    const state = bcrypt.compareSync(plaintPassword, hashedPassword);
    return state;
};

// functional methods
const getAllUsers = async (page, limit) => {
    try {
        let data = [];
        if (page && limit) {
            //pagination
            page = +page;
            limit = +limit;
            let offset = (page - 1) * limit;

            data = await db.User.findAll({
                attributes: ['id', 'username', 'email', 'phone', 'gender', 'address'],
                include: {
                    model: db.Role, attributes: ['id', 'name', 'description']
                },
                raw: true,
                nest: true,
                offset: offset,
                limit: limit,
                order: [['id', 'DESC']]
            });
        } else {
            data = await db.User.findAll({
                attributes: ['id', 'username', 'email', 'phone', 'gender', 'address', 'roleID'],
                include: {
                    model: db.Role, attributes: ['id', 'name', 'description']
                },
                raw: true,
                nest: true,
                order: [['id', 'DESC']]
            });
        }

        if (data && data.length > 0) {
            return updateReturnedData(200, `Fetch all ${data.length} users is successfully`, data);
        } else {
            return updateReturnedData(404, "There is no user in database", null);
        }
    } catch (error) {
        console.log("User service error: " + error.message);
        return updateReturnedData(500, "User service error: " + error.message, null);
    }
}

const createNewUser = async (userData) => {
    try {
        let validateState = validateUserDataBeforeInsertion(userData);
        if (validateState === false) {
            return updateReturnedData(400, `${returnedData.data} is required`, returnedData.data);
        }

        let existingUser = await db.User.findOne({
            where: {
                email: userData.email
            }
        });

        if (existingUser) {
            return updateReturnedData(400, `Email is already used by another account !`, null);
        }

        userData.password = hashPassword(userData.password);
        userData.createdAt = new Date();

        await db.User.create(userData);
        return updateReturnedData(200, `New user is created successfully!`, userData.id);

    } catch (error) {
        console.log("User service error: " + error.message);
        return updateReturnedData(500, "User service error: " + error.message, null);
    }
}

const updateUser = async (userData) => {
    try {
        let user = await db.User.findOne({
            where: {
                id: userData.id,
            },
        });

        if (!user) {
            return updateReturnedData(404, "User is not found", null);
        }
        //ensure that the email is cannot be changed
        userData.email = user.email;
        user.updatedAt = new Date();

        await user.update();

        return updateReturnedData(200, "Update user successfully !", userData.id);
    } catch (error) {
        console.log("User service error: " + error.message);
        return updateReturnedData(500, "User service error: " + error.message, null);
    }
};

const deleteUser = async (userID) => {
    try {
        let user = await db.User.findOne({
            where: {
                id: userID,
            },
        });

        if (!user) {
            return updateReturnedData(404, "User is not found", null);
        }
        //ensure that the username is cannot be changed
        await user.destroy();

        return updateReturnedData(200, "Delete user successfully !", userData.id);
    } catch (error) {
        console.log("User service error: " + error.message);
        return updateReturnedData(500, "User service error: " + error.message, null);
    }
}

const handleLogin = async (userData) => {
    try {
        let user = await db.User.findOne({
            where: {
                email: userData.email,
            },
            attributes: ['id', 'username', 'password', 'email', 'phone', 'gender', 'address'],
            include: { model: db.Role, attributes: ['id', 'name', 'description'] },
            raw: true,
            nest: true
        });

        if (!user) return updateReturnedData(400, "Incorrect email or password", null);

        let passwordState = checkPassword(userData.password, user.password);

        if (passwordState === true) {
            return updateReturnedData(200, "Login successfully", data = {
                ...user,
                password: null,
            });
        } else {
            return updateReturnedData(400, "Incorrect email or password", null);
        }
    } catch (error) {
        console.log("User service error: " + error.message);
        return updateReturnedData(500, "User service error: " + error.message, null);
    }
}

const getUserByID = async (userID) => {
    try {
        let user = await db.User.findOne({
            where: {
                id: userID,
                raw: true,
            }
        })

        if (!user) {
            return updateReturnedData(404, "User not found", null);
        }

        return updateReturnedData(200, "Get user by id successfully", user);
    } catch (error) {
        console.log("User service error: " + error.message);
        return updateReturnedData(500, "User service error: " + error.message, null);
    }
}

module.exports = UserService = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    handleLogin,
    getUserByID,
}