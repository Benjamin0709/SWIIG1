import express from "express";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async(req, res) => {
    try {
        const { nombre, rut, email, telefono, password } = req.body;

        const existe = await User.findOne({ $or: [{ email }, { rut }] });

        if (existe) {
            return res.status(400).json({ msg: "Usuario ya existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = new User({
            nombre,
            rut,
            email,
            telefono,
            password: hashedPassword
        });

        await nuevoUsuario.save();

        res.json({ msg: "Usuario creado" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error del servidor" });
    }
});

export default router;