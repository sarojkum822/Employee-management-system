import userModel from '../models/User.model.js'
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {

    const { token } = req.cookies;


    if (!token) {
        return res.status(404).json({
            sucess: false,
            message: "Login First"
        })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    req.user = await userModel.findById(decoded._id);
    next();
}