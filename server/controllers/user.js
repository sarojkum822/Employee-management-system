import userModel from '../models/User.model.js'
import bcrypt from "bcrypt";
import { sendCookie } from '../utils/features.js';

export const getAllUsers = async (req, res) => { }


export const login = async (req, res, next) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        return res.status(404).json({
            sucess: false,
            message: "Invalid Email or Password"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(404).json({
            sucess: false,
            message: "Invalid Email or Password"
        })
    }

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);

}


export const register = async (req, res) => {

    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user) {
        return res.status(404).json({
            sucess: false,
            message: "User Already Exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await userModel.create({ name, email, password: hashedPassword })

    sendCookie(user, res, "Registered Successfully", 201);
}
export const getMyProfile = async (req, res) => {
  
    res.status(200).json({
        sucess: true,
        user: req.user,
    })

}

export const Logout = (req, res) => {

    res.status(200).cookie("token", "", {
        expires: new Date(Date.now())
    }).json({
        sucess: true,
        user: req.user,
    })
}