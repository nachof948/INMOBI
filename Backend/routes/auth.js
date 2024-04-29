import express from 'express'
import { signup, signin, google, logout } from '../controllers/auth.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/logout', logout)
router.post('/google', google)

export default router