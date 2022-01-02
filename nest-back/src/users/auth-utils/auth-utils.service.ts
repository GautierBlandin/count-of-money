import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class AuthUtilsService {
  generateAccessToken(email: string): string {
    const randToken = crypto.randomBytes(20).toString('hex');
    return (
      Buffer.from(email).toString('base64') +
      '.' +
      Buffer.from(randToken).toString('base64')
    );
  }

  encryptPassword(password: string) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  decodeAccessToken(access_token: string): string {
    const [encodedEmail, token] = access_token.split('.');
    return Buffer.from(encodedEmail, 'base64').toString();
  }
}
