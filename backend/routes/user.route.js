import express from 'express'
import {registerUser,allUsers,loginUser, logoutUSer} from '../controllers/user.controller.js'
const router = express.Router()
router.post('/registerUser',registerUser)
router.get('/allUsers',allUsers)
router.post('/login',loginUser)
router.post('/logout',logoutUSer)
export default router