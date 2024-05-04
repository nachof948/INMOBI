import express from 'express'
import { verifyUser } from '../middleware/verifyUser.js'
import { createListing, deleteListing, getList, updateListing, getListings } from '../controllers/listing.js'

const router = express.Router()

router.post('/create', verifyUser, createListing);
router.delete('/delete/:id', verifyUser, deleteListing);
router.put('/update/:id', verifyUser, updateListing);
router.get('/list/:id', verifyUser, getList)
router.get('/search', getListings)

export default router