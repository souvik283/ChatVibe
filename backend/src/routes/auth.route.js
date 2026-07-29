import express from "express"
import {signupHandler, loginHandler, logoutHandler, updateProfileHandler} from "../controllers/auth.controller.js"
import {checkUserLogin} from "../middlewares/auth.middleware.js"
import arcjectProtection from "../middlewares/arcjet.middleware.js"

const router = express.Router()

// router.use(arcjectProtection)

router.post("/register", signupHandler)
router.post("/login", loginHandler)
router.post("/logout", logoutHandler)

router.get("/check",checkUserLogin, (req, res)=>{
    res.status(201).json({
        message: "LoggedIn user",
        user: req.user
    })
})

router.post("/updateprofile", checkUserLogin, updateProfileHandler)

export default router