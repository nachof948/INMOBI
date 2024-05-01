import { errorHandler } from "../middleware/error.js";
import Usuario from "../models/user.js"
import Listing from "../models/listing.js";

export const updateUser = async (req, res, next) =>{
    const { email, username, password, imageProfile } = req.body;
    const { id } = req.params;
    try {

        const updatedUser = await Usuario.findByIdAndUpdate(id, {
            $set: {
                username: username,
                email: email,
                password: password, // Usar la contraseña hasheada
                imageProfile: imageProfile
            }
        }, { new: true });

        const { password: pass, ...rest } = updatedUser._doc;
        res.status(200).json({result:rest});
    } catch(error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) =>{
    const { id } = req.params
    if(req.user.id !== id){
        return next(errorHandler(401, 'Solo puedes eliminar tu propia cuenta!'))
    }
    try {
        await Usuario.findByIdAndDelete(id)
        res.clearCookie('access_token')
        res.status(200).json({message:'El usuario fue eliminado'})
    } catch (error) {
        next(error)
    }
}

export const getUserListing = async (req, res, next) =>{
    const {id} = req.params
    if(req.user.id === id){
        try {
            const listings = await Listing.find({userRef: id});
            res.status(200).json(listings)
        } catch (error) {
            next(error)
        }
        
    }else{
        return next(errorHandler(401,'Solo puedes ver tus propias publicaciones'))
    }

}