import express from 'express'
import { updateUser } from '../controllers/user.js'
import { verifyUser } from '../middleware/verifyUser.js'

const router = express.Router()

router.post('/update/:id', verifyUser ,updateUser)

export default router