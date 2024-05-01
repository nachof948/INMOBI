import Listing from "../models/listing.js"

export const createListing = async (req, res, next) =>{
    const { formData } = req.body
    try {
        const listing = await Listing.create(formData)
        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}