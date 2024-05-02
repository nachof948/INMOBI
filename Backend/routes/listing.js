import express from 'express'
import { verifyUser } from '../middleware/verifyUser.js'
import { createListing, deleteListing, getList, updateListing } from '../controllers/listing.js'

const router = express.Router()

router.post('/create', verifyUser, createListing);
router.delete('/delete/:id', verifyUser, deleteListing);
router.put('/update/:id', verifyUser, updateListing);
router.get('/list/:id', verifyUser, getList)

export default router