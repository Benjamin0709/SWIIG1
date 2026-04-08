import express from "express";
import { createUser, getUsers, editUser, deleteUser, loginUser, getProfile, getVerifyUser } from "../controllers/user.controller.js";
import { auth, authorizeRoles } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.route('/user')
    .post(createUser)
    .get(auth, authorizeRoles('admin', 'superadmin'), getUsers)

userRouter.route('/user/:id')
    .put(auth, editUser)
    .delete(auth, authorizeRoles('admin', 'superadmin'), deleteUser)
    .get(auth, getProfile)

userRouter.route('/login')
    .post(loginUser)

userRouter.route("/verifyUser")
    .get(auth, getVerifyUser)


export default userRouter;