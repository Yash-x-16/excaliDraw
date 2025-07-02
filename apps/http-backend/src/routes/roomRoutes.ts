import express from "express"
import { Middleware } from "../middleware/middleware.js"
import { roomController } from "../controller/roomController.js"

const router = express.Router()

router.post('/room',Middleware,roomController)

export default router 