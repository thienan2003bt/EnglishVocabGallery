import axios from '../configs/axios';

const fetchUsers = async (page, limit) => {
    let response = await axios.get(`api/user/read?page=${page}&limit=${limit}`);
    return response;
}

const createNewUser = async (userData) => {
    let response = await axios.post(`api/user/create`, { userData });
    return response;
}

const updateUser = async (userData) => {
    let response = await axios.put(`api/user/update`, { userData });
    return response;
}

const deleteUser = async (userID) => {
    let response = await axios.delete(`api/user/delete`, { userID });
    return response;
}

const handleLogin = async (userData) => {
    let response = await axios.post(`api/login`, { ...userData });
    return response;
}

const handleSignup = async (userData) => {
    let response = await axios.post(`api/signup`, {
        ...userData
    });
    return response;
}

const UserService = {
    fetchUsers,
    createNewUser,
    updateUser,
    deleteUser,
    handleLogin,
    handleSignup
};

export default UserService;