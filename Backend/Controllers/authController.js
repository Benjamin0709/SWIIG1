import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ======================
// REGISTER
// ======================
export const register = async(req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Validar campos
        if (!nombre || !email || !password) {
            return res.status(400).json({ msg: "Campos obligatorios" });
        }

        // Verificar si ya existe
        const existe = await User.findOne({ email });
        if (existe) {
            return res.status(400).json({ msg: "Usuario ya existe" });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Crear usuario
        const user = new User({
            nombre,
            email,
            password: passwordHash
        });

        await user.save();

        res.json({ msg: "Usuario registrado correctamente" });

    } catch (error) {
        console.log("ERROR REGISTER:", error);
        res.status(500).json({ msg: "Error servidor" });
    }
};

// ======================
// LOGIN
// ======================
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Validar campos
        if (!email || !password) {
            return res.status(400).json({ msg: "Campos obligatorios" });
        }

        // Buscar usuario
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Usuario no existe" });
        }

        // Validar contraseña
        const valido = await bcrypt.compare(password, user.password);
        if (!valido) {
            return res.status(400).json({ msg: "Contraseña incorrecta" });
        }

        // Crear token
        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET, { expiresIn: "2h" }
        );

        // Respuesta
        res.json({
            msg: "Login exitoso",
            token,
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email
            }
        });

    } catch (error) {
        console.log("ERROR LOGIN:", error);
        res.status(500).json({ msg: "Error servidor" });
    }
};