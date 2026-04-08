
import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
dotenv.config();


const getToken = async (req, res, next) => {
    const { authorization } = req.headers;
    

    if(authorization){
        const [type, token] = authorization.split(' ');
        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
        req.user = await User.findById(decoded.id).select('-name')
        return type === "Bearer" ? token: null;
    } else {
        return null;
    }
}



const auth = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'user',
    getToken
})

// payload name , id, isAdmin

// const admin = (req, res, next) => {
//     try {
//         if(req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')){
//             next()
//        }
//        else{
//            throw new Error('Not Authorized as an admin or superadmin') 
//        }
//     } catch (error) {
//         res.status(401).json({success: false, errorMSG: error.message})
//     }
    
// }

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (
                req.user &&
                Array.isArray(req.user.roles) &&
                req.user.roles.some(role => allowedRoles.includes(role))
            ) {
                next();
            } else {
                throw new Error('Not authorized for this action');
            }
        } catch (error) {
            res.status(403).json({ success: false, errorMSG: error.message });
        }
    };
};

export {authorizeRoles, auth};