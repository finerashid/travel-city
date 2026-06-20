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
        let userId = req.params.id;
        if (userId) {
            const foundUser = await user.findById(userId);
            sendRes.success = true;
            sendRes.message = 'User retrieved by ID successfully';
            sendRes.data = foundUser;
            return res.status(200).json(sendRes);
        }
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

const updateUser = async (req, res) => {
    try {
        let userId = req.params.id;
        let updateData = req.body;

        const updatedUser = await user.findByIdAndUpdate(userId, updateData);

        if (!updatedUser) {
            sendRes.success = false;
            sendRes.message = 'User not found';
            return res.status(404).json(sendRes);
        }

        sendRes.success = true;
        sendRes.message = 'User updated successfully';
        sendRes.data = updatedUser;
        return res.status(200).json(sendRes);
    } catch (error) {
        console.log("error while updating user: ", error);
        return res.status(500).json(sendRes);
    }
};

const deleteUser = async (req, res) => {
    try {
        let userId = req.params.id;
        const deletedUser = await user.findByIdAndDelete(userId);

        if (!deletedUser) {
            sendRes.success = false;
            sendRes.message = 'User not found';
            return res.status(404).json(sendRes);
        }

        sendRes.success = true;
        sendRes.message = 'User deleted successfully';
        sendRes.data = deletedUser;
        return res.status(200).json(sendRes);
    } catch (error) {
        console.log("error while deleting user: ", error);
        return res.status(500).json(sendRes);
    }
};

module.exports = { addUser, getUsers, updateUser, deleteUser };