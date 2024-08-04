import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

const authenticate = asyncHandler(async (req, res, next) => {

    //read jwt from "jwt cookie"

    const token = req.cookies.jwt;
    console.log(token)
    if (token) {
        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userID).select('-password');
            next();
            /*
            The decoded variable would contain an object like this:
                
            {
                userID: 'someUserIdValue', // The actual user ID from the database
                iat: 1629901550,  // Issued at time (timestamp)
                exp: 1629944750  // Expiration time (timestamp)
            }

            user:{
                _id: 'someUserIdValue',
                username: 'exampleUser',
                email: 'user@example.com',
                password: 'hashedPassword', // This field will be excluded
                isAdmin: false,
                createdAt: '2024-08-01T00:00:00.000Z',
                updatedAt: '2024-08-02T00:00:00.000Z'
            } 
                
            
                */

        } catch (error) {
            res.status(401);
            throw new Error('Not authorized,Invalid token')
            //This throw error will be caught by async handler since authenticate fucntion is passed as argument in the async handler

        }
    }
    else {
        res.status(401);
        throw new Error('Not authorized.No token found')
        //This throw error will be caught by async handler since autheticate fucntion is passed as argument in the async handler

    }
});

const isUserAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send("Not authorized as an Admin");
    }
};

export { authenticate, isUserAdmin };
