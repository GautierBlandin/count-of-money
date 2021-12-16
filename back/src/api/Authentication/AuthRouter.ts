import express from 'express';
import axios from 'axios';
import {getRepository} from "typeorm";
import {User} from "../../entity/User";
import {generateAccessToken} from "../../../libraries/Authentication";

export const AuthRouter = express.Router();

AuthRouter.get('/auth/:provider', async (req, res) => {
    const userRepository = getRepository(User);

    console.log(req.params.provider)
    switch(req.params.provider){

        case 'google' :

            // Get user credentials from google using the code from received from the front-end
            const googleResponse = await axios.post('https://oauth2.googleapis.com/token', {
                grant_type: 'authorization_code',
                code: req.query.code,
                redirect_uri: 'http://localhost:3000/oauth-callback',
                client_id: '67182165806-r0l3mf6fg61t65h7n6df8b8a5jee78g0.apps.googleusercontent.com',
                client_secret: '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'
            }).catch(err => {console.log(err)})

            // If googleReponse is not defined to the request being rejected, send a 400 status error
            if(!googleResponse){
                res.status(400)
                res.send('Problem with google authorization')
                return
            }

            // Get openID token and decode it
            const id_token = googleResponse.data.id_token
            const [header, payload, signature] = id_token.split('.');

            console.log(Buffer.from(payload, 'base64').toString())
            const user_infos = JSON.parse(Buffer.from(payload, 'base64').toString());

            // Create a new user if necessary, and generate a new access token in any event
            const user = await userRepository.findOne({email: user_infos.email}).catch(console.log);
            if(user){
                const token = generateAccessToken(user.email);
                await userRepository.update({email: user.email}, {access_token: token}).catch(console.log);
                res.json({
                    email: user.email,
                    access_token: token
                })
            } else {
                const new_user = await userRepository.save({
                    email: user_infos.email,
                    cryptos: [],
                    press_keywords: [],
                }).catch(console.log)
                if(!new_user) return;
                const token = generateAccessToken(new_user.email);
                await userRepository.update({email: new_user.email}, {access_token: token}).catch(console.log)
                res.json({
                    email: new_user.email,
                    access_token: token
                })
            }
    }
})

AuthRouter.post('/register', (req, res) => {
    // Get user
})
