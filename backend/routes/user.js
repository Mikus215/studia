import express from 'express'
import { postCreateUser, postLoginUser, deleteCookieLogout } from '../controllers/userController.js'
import { registerUserValidation } from '../middleware/registerUserValidation.js'
import { loginUserValidation } from '../middleware/loginUserValidation.js'

const router = express.Router()

router.post('/register', registerUserValidation, postCreateUser)
router.post('/login', loginUserValidation, postLoginUser)
router.post('/logout', deleteCookieLogout)

export default router