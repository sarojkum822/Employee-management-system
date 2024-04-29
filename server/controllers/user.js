import userModel from '../models/User.model.js';
import bcrypt from "bcrypt";
import { sendCookie } from '../utils/features.js';



export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password"
      });
    }

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await userModel.create({ name, email, password: hashedPassword });
    sendCookie(user, res, "Registered successfully", 201);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export const Logout = (req, res) => {
  try {
    res.status(200).cookie("token", "", {
      expires: new Date(Date.now())
    }).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
