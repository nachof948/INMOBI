import express from 'express'
import { updateUser, deleteUser, getUserListing } from '../controllers/user.js'
import { verifyUser } from '../middleware/verifyUser.js'

const router = express.Router()

router.post('/update/:id', verifyUser ,updateUser)
router.delete('/delete/:id', verifyUser , deleteUser)
router.get('/listings/:id', verifyUser, getUserListing)

export default router