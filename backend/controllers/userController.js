import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/token.js";


const createUser = asyncHandler(async (req, res) => { // calling async function for error handling
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new Error("please fill out the form");
    }


    // Hashing and securely storing password in DB Bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400).send("User Already exists")
        return;
    }

    const newUser = User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        //generating token 
        generateToken(res, newUser._id);
        res.json(
            {
                _id: newUser._id,
                username: newUser.username,
                Email: newUser.email,
                password: newUser.password
            })
    }

    catch (error) {
        res.status(400);
        throw new ("Save not successfull");

    }
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check existing user with email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (isValidPassword) {
            generateToken(res, existingUser._id);

            res.json(
                {
                    username: existingUser.username,
                    email: existingUser.email,
                    Message: "Logged IN successfully",
                })
        }
        return;
    }
    else {

        res.status(400).json({ Message: "User not registred or invalid Email" })
    }
});

const logOut = asyncHandler(async (req, res) => {
    res.cookie('jwt',"", {
        httpOnly: true,
        expires: new Date(0),
    }) 

    res.json({ message: "Logged out successfully" });
});

const getAllUser = asyncHandler(async (req, res) => {
    const allUser = await User.find({});
    res.json(allUser); 
})

export { createUser, loginUser, logOut, getAllUser };
