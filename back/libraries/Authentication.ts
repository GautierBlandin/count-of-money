import crypto from "crypto";

export function generateAccessToken(email: string):string{
    const randToken = crypto.randomBytes(20).toString('hex');
    return Buffer.from(email).toString('base64')  + '.' + Buffer.from(randToken).toString('base64');
}
