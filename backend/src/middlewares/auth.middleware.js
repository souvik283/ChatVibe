import jwt from "jsonwebtoken"
import userModel from "../models/User.js"

export  async function checkUserLogin(req, res, next) {

    try {
     const token = req.cookies.jwt
        if (!token) {
            res.status(400).json({
                message: "Login first then come"
            })
        }
     const user =   jwt.verify(token, process.env.JWT_SECRET)
     const userAccount = await userModel.findById(user.id)

     if (!userAccount) {
            res.status(400).json({
                message: "Invalid user. Please re-login"
            })
        }

     res.user=userAccount
     next()
     
    } catch (error) {
        return res.status(400).json({
        error
    })
    }

    
}