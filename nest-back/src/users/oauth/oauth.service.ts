import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OauthService {
  async getEmailFromOAuth({
    provider,
    code,
  }: {
    provider: string;
    code: string;
  }): Promise<string> {
    switch (provider) {
      case 'google':
        const googleResponse = await axios
          .post('https://oauth2.googleapis.com/token', {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.OAUTH_REDIRECT_URI,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
          })
          .catch((err) => {
            console.log(err);
          });

        if (!googleResponse) {
          throw new Error('Google authentication failed');
        }

        const id_token = googleResponse.data.id_token;
        const [header, payload, signature] = id_token.split('.');
        console.log(
          'Decoded Id Token: ',
          Buffer.from(payload, 'base64').toString(),
        );
        const user_infos = JSON.parse(
          Buffer.from(payload, 'base64').toString(),
        );

        return user_infos.email;
      default:
        throw new Error('Unknown provider');
    }
  }
}
