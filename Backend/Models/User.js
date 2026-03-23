import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre: String,
    rut: { type: String, unique: true },
    email: { type: String, unique: true },
    telefono: String,
    password: String
});

export default mongoose.model("User", userSchema);