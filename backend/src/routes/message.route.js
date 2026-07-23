import express from "express"
import {getAllContactsHandler, getChatsHandler, getMessageByUserId, sendMessageToUser} from "../controllers/message.controller.js"
import { checkUserLogin } from "../middlewares/auth.middleware.js"
import arcjectProtection from "../middlewares/arcjet.middleware.js"

const router = express.Router()

router.use(checkUserLogin)

router.get("/contacts", getAllContactsHandler)
router.get("/chats", getChatsHandler)
router.get("/", getMessageByUserId)
router.post("/send/:id", sendMessageToUser)

 
export default router