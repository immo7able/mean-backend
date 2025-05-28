import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticateSocket = async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        if (!token) return next(new Error('No token provided'));

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        const user = await User.findById(decoded.userId);
        if (!user) return next(new Error('Authentication failed'));

        socket.user = user;
        next();
    } catch (err) {
        console.error("Auth error:", err.message);
        next(new Error('Authentication error: ' + err.message));
    }
};
