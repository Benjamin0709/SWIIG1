import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

// mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Base de datos conectada con exito!')).catch((error) => {
    console.error('Error al conectar a la DB:', error);
    process.exit(1); // mata el servidor si falla
  });