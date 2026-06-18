const user = require('../models/User');

let sendRes = {
    success: false,
    message: 'Something went wrong',
    data: null
}
const addUser = async (req, res) => {
    try {
        let newUser = req.body;
        if (!newUser || !newUser.name || !newUser.email || !newUser.password) {
            sendRes.message = 'Please provide all required fields';
            return res.status(400).json(sendRes);
        }
        let createdUser = {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
        }
        if(newUser.role) {
            createdUser.role = newUser.role;
        }
        if(newUser.phone) {
            createdUser.phone = newUser.phone;
        }
        if(newUser.avatarUrl) {
            createdUser.avatarUrl = newUser.avatarUrl;
        }
        if(newUser.isActive !== undefined) {
            createdUser.isActive = newUser.isActive;
        }
        const savedUser = await user.create(createdUser);
        if (savedUser) {
        sendRes.success = true;
        sendRes.message = 'User added successfully';
        sendRes.data = savedUser;
        return res.status(200).json(sendRes);
        }
    } catch (error) {
        console.log("error while adding user: ", error);
        return res.status(500).json(sendRes);
    }
};

const getUsers = async (req, res) => {
    try {
        let userData = req.body;
        let query = {};
        if (userData.name) {
            query.name = userData.name;
        }
        if (userData.email) {
            query.email = userData.email;
        }
        if (userData.role) {
            query.role = userData.role;
        }
        const users = await user.find(query);
        sendRes.success = true;
        sendRes.message = 'Users retrieved successfully';
        sendRes.data = users;
        return res.status(200).json(sendRes);
    } catch (error) {
        console.log("error while retrieving users: ", error);
        return res.status(500).json(sendRes);
    }
};

module.exports = { addUser, getUsers };