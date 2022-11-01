import express from 'express'
import { postCreateUser, postLoginUser, deleteCookieLogout } from '../controllers/userController.js'

const router = express.Router()

router.post('/register', postCreateUser)
router.post('/login', postLoginUser)
router.post('/logout', deleteCookieLogout)

export default router