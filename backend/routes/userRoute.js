import express from "express";
import { createUser, loginUser, logOut, getAllUser } from "../controllers/userController.js";
import { authenticate, isUserAdmin } from "../middlewares/authmiddleware.js";

const router = express.Router()

router.route("/")                               // use(path,controller)
    .post(createUser)                         
    .get(authenticate, isUserAdmin, getAllUser);  // Only accessible by admin// 

router.post("/login", loginUser) //post data on /login will send post request
router.post("/logOut", logOut)


export default router;
