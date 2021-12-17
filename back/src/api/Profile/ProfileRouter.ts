import express from 'express';
import {decodeAccessToken} from "../../../libraries/Authentication";
import {getRepository} from "typeorm";
import {User} from "../../entity/User";

export const ProfileRouter = express.Router();

ProfileRouter.get('/profile', async (req, res) => {
    const userRepository = getRepository(User);
    // Get user email from access token
    const email = decodeAccessToken(req.header('Authorization')!);
    // Get user from database
    const user = await userRepository.findOne({email: email});
    if(user) {
        // Return user informations from database
        res.json({
            email: user.email,
            currency: user.currency,
            press_keywords: user.press_keywords,
            cryptos: user.cryptos
        })
    } else {
        res.status(404);
        res.send('User not found');
    }
})

ProfileRouter.put('/profile', async (req, res) => {
    const userRepository = getRepository(User);
    // Get user email from access token
    const email = decodeAccessToken(req.header('Authorization')!);
    // Get user from database
    const user = await userRepository.findOne({email: email});
    // Update user information with request information
    if(user) {
        await userRepository.update({email: user.email}, {
            currency: req.body.currency,
            press_keywords: req.body.press_keywords,
            cryptos: req.body.cryptos
        })
    }
    res.send('User updated');
})
