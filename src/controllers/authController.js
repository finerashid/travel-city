const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try{
        const { name, email, password, role} = req.body;
        const existUser = await User.findOne({email});

        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already registerd",
                data: null,
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                data: null,
            });
        }

        if(user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
                data: null,
            });
        }

        const token = jwt.sign({id: user._id, email: user.email, role: user.role,}, process.env.JWT_SECRET, {expiresIn: "7d",});

        return res.status(200).json({
                success: true,
                message: "Login succesful",
                token,
            }); 
    } catch (error) {
        return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
    }
};

const changePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body;

        const user = await User.findById(req.user._id).select("+password")

        if(user.password !== oldPassword){
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
                data: null,
            });
        }

        user.password == newPassword;

        await user.save();

         return res.status(200).json({
                success: true,
                message: "Password changed succesful",
                data: null,
            }); 

    } catch (error) {
        return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
    }
}


module.exports = {signup, login, changePassword,}