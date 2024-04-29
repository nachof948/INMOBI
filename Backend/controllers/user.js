import Usuario from "../models/user.js"
import bcrypt from 'bcrypt'

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
