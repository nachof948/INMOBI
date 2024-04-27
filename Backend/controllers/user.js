import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {errorHandler} from '../middleware/error.js'

import 'dotenv/config'

export const signup = async(req, res,next) =>{
    const { username, email, password } = req.body;
    try{
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(404).json({ message: ' El usuario ya esta registrado'})
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            username,
            email,
            password: hashPassword
        })
        console.log(newUser)

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.KEY_TOKEN, { expiresIn:'1h'})
        const { password: pass, ...rest } = newUser._doc
        res.status(200).json({ result: rest, token})
    }
    catch(error){
        next(error)
    }
}


export const signin = async(req, res, next) =>{
    const { email, password } = req.body
    try{
        const existingUser = await User.findOne({ email });
        
        if(!existingUser){
            return next(errorHandler(404, 'Usuario no encontrado'))
        }
        const isPasswordCorrrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrrect){
            return next(errorHandler(401, 'Contraseña invalida'))
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.KEY_TOKEN)
        const { password: pass, ...rest } = existingUser._doc
        res.status(200).json({ result: rest, token})
    }
    catch(error){
        res.status(500). json({ message:'Something went wrong'})
    }
}

export const google = async (req, res, next) => {
    const { email, name, photo } = req.body;
    try{ 
        const user = await User.findOne({email})
        
        if(user){
            const token = jwt.sign({ id: user._id}, process.env.KEY_TOKEN)
            const { password: pass, ...rest } = user._doc;
            res.status(200).json({ result: rest, token})
        }else{
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashPassword = await bcrypt.hash(generatePassword, 10);
            const newUser = await User.create({
                username: name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email: email,
                imageProfile: photo,
                password: hashPassword
            })
            await newUser.save()
            const token = jwt.sign({ id: newUser._id}, process.env.KEY_TOKEN)
            const { password: pass, ...rest } = newUser._doc;
            res.status(200).json({ result: rest, token})
        }
    }catch(error){
        next(error)
    }

}