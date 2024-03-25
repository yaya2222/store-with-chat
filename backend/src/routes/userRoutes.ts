
import * as AuthController from "../controllers/authController"
import { Router } from "express"

const router = Router()

router.post("/register",AuthController.register)
router.post("/login",AuthController.login)

export default router