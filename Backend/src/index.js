// Librerias
import express from "express";
import centerRoutes from "./routes/center.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

// Traemos la conexion de la base de datos al servidor
import './config/database.js';

// Instaciamiento de express
const app = express();

//Middleware

//Servidor entiende en POST ---> JSON
app.use(cors()); // aceptamos all origins todos los dominios
app.use(express.json());
// Con esto usamos una router en nuestro servidor
app.use("/api", centerRoutes);
app.use("/api", userRoutes);



// Levantamiento de servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor conectado en puerto: ${process.env.PORT}`)
})
