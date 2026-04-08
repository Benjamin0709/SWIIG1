import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Without Name",
        trim: true,
        lowercase: true,
        minLength: 2
    },
    lastname: {
        type: String,
        default: "Without Last Name",
        trim: true,
        lowercase: true,
        minLength: 2
    },
    rut: {
        type: String,
        default: "Without RUT",
        trim: true,
        lowercase: true,
        minLength: 8
    },
    phone: {
        type: String,
        trim: true,
        match: [/^\+?(\d.*){3,}$/gm]
    },
    email: {
        type: String,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g],
        required: true
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    password: {
        type: String,
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/gm],
        required: true
    },
    salt: String,
    roles: {
        type: [String],
        enum: ['user', 'admin', 'superadmin', 'doctor', 'receptionist', 'assistant', 'manager', 'cashier'],
        default: ['user']
    }
})

userSchema.methods.encriptarPassword = function(password) {
    this.salt = crypto.randomBytes(10).toString('hex')
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 10, 'sha-512').toString('hex')
}

userSchema.methods.verificarEncriptacion = function(password, salt, passwordDB) {
    const encriptar = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha-512').toString('hex')
    return encriptar === passwordDB // true o un false
}

//use claims to store user data in the token (name, id, isAdmin, role)

userSchema.methods.generateToken = function() {
    const payload = {
        id: this._id,
        name: this.name,
        roles: this.roles
    }

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 900 })
    return token
}

const User = mongoose.model('user', userSchema);

export default User;