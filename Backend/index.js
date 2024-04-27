import express from 'express'
import connectDB from './db/connect.js';
import authRouter from './routes/user.js'
import 'dotenv/config'
import bodyParser from 'body-parser';
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

const PUERTO = process.env.PUERTO

app.use(bodyParser.json({ limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}));
app.use(cors())
app.use(cookieParser())


//RUTAS
app.use('/auth', authRouter)

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
