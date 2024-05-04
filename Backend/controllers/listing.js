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
    const {formData} = req.body;
    try {
        const updateList = await Listing.findByIdAndUpdate(id, formData, {new: true})
        res.status(200).json(updateList)
    } catch (error) {
        next(error)
    }
}

export const getListings = async (req, res, next) =>{
    try {
        //Limite de publicaciones
        const limit = parseInt(req.query.limit) || 9;
        //Inicio de la muestra de publicaciones
        const startIndex = parseInt(req.query.startIndex) || 0;
        
        let offer = req.query.offer;
        if(offer === undefined || offer === 'false'){
            offer = { $in: [false, true]}
        }

        let furnished = req.query.furnished;
        if(furnished === undefined || furnished === 'false'){
            furnished = { $in: [false, true]}
        }
        
        let parking = req.query.parking;
        if(parking === undefined || parking === 'false'){
            parking = { $in: [false, true]}
        }
        
        let type = req.query.type;
        if(type === undefined || type === 'all'){
            type = { $in: ['sale', 'rent']}
        }
        
        const search = req.query.search || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const listing = await Listing.find({
            name: {$regex: search, $options: 'i'},
            offer,
            furnished,
            parking,
            type
        }).sort(
            {[sort]: order}
        ).limit(limit).skip(startIndex);

        return res.status(200).json(listing)

    } catch (error) {
        next(error);
    }
}