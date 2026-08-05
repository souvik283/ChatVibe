import jwt from "jsonwebtoken";
import ENV from "../lib/env.js";
import userModel from "../models/User.js";

export async function socketAuthMiddleware(socket, next) {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection failed: No token provided");
      return next(new Error("Unauthorized - No token provided"));
    }

    const user = jwt.verify(token, ENV.jwt_secret);

    if (!user) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid token"));
    }
    const userAccount = await userModel.findById(user.id);
    if (!userAccount) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("Unauthorized - User not found"));
    }

    socket.user = userAccount;
    socket.userId = userAccount._id.toString();
    console.log(`Socket authenticated for user: ${userAccount.name}`);
    
    next()
  } catch (error) {
    console.log("Socket connection rejected: ", error);
    return next(new Error("Failed to authentication"));
  }
}
