import express from "express"
import {signupHandler, loginHandler, logoutHandler, updateProfileHandler} from "../controllers/auth.controller.js"
import {checkUserLogin} from "../middlewares/auth.middleware.js"
const router = express.Router()

router.post("/register", signupHandler)
router.post("/login", loginHandler)
router.post("/logout", logoutHandler)

router.post("/updateprofile", checkUserLogin, updateProfileHandler)

export default router