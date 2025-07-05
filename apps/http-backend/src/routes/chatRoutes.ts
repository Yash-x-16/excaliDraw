import express from "express"
import { Middleware } from "../middleware/middleware.js"
import { chatController } from "../controller/chatController.js"

const router =  express.Router()

router.get('/:roomId',Middleware,chatController)


export default router 