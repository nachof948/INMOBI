import express from 'express'
import connectDB from './db/connect.js';
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import listingRouter from './routes/listing.js'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

const PUERTO = process.env.PUERTO


app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())



//RUTAS
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/listing', listingRouter)


//MIDDLEWARE
app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';
    return res.status(statusCode).json({
        sucess:false,
        statusCode,
        message
    });
});



/* CONEXION A LA BASE DE DATOS */
const iniciar = async ()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(PUERTO, ()=>{console.log(`Se inicio el servidor en el http://localhost:${PUERTO}`)})
    }
    catch(error){
        console.log(error)
    }
}
iniciar()
