import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

// mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB).then(() => console.log('Base de datos conectada con exito!'))