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

export const deleteListing = async (req, res, next) =>{
    const { id } = req.params
    try {
        await Listing.findByIdAndDelete(id)
        res.status(200).json('Se elimino correctamente')
    } catch (error) {
        next(error)
    }
}