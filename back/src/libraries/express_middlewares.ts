// Return a middleware that the Authorization header is valid
import {RequestHandler} from "express";
import {decodeAccessToken} from "./Authentication";
import {User} from "../entity/User";
import {getRepository} from "typeorm";

export function withAuth(admin?:boolean):RequestHandler{
    return async (req, res, next) => {
        const token = req.header('Authorization');
        let authorized = true;
        if (token) {
            // Decode the token
            const email = decodeAccessToken(token);
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({email: email});
            // Check that the access token is valid
            if(token != user?.access_token){
                authorized = false;
            }
            // If admin access is required, check that the user is an admin
            if(admin){
                if(!user){
                    authorized = false;
                } else {
                    if(!user.admin){
                        authorized = false;
                    }
                }
            }
        } else {
            // If no token is provided, the user is not authorized
            authorized = false;
        }
        // If the request is authorized, continue
        if(authorized){
            next();
        } else {
            res.status(401).send('Access denied');
        }
    };
}
