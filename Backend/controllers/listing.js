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

export const getList = async (req, res, next) =>{
    const { id } = req.params;
    try {
        const list = await Listing.findById(id);
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}


export const updateListing = async (req, res, next) =>{
    const { id } = req.params
    const update = req.body;
    try {
        const updateList = await Listing.findByIdAndUpdate(id,{
            $set: update
        }, {new: true})
        res.status(200).json({result: updateList})
    } catch (error) {
        next(error)
    }
}