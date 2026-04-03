import jwt from "jsonwebtoken";
import User from "../models/user_model.js";

export const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // find user
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }


        // if (!user.isActive) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "User account is inactive",
        //     });
        // }

        req.user = user;

        next();

    } catch (error) {
        console.error("Auth Middleware Error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};