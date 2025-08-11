import { Env } from "../config";
import * as jwt from "jsonwebtoken";


export function createToken(user) {

    const expiresIn = 60 * 60 * 24 * 30 * 6; // 6 month
    const secret = Env.JWTSecret;
    const dataStoredInToken = {
        _id: user.id,
        tokentype: 1
    };
    const token = jwt.sign(dataStoredInToken, secret, { expiresIn })
    return {
        expiresIn,
        token
    };
}

export function decodeToken(token) {
    try {
        const decoded = jwt.verify(token, Env.JWTSecret);
        return decoded;
    } catch (error) {
        return null;
    }
}

export async function verifyToken(token) {

    const secret = Env.JWTSecret;
    const user = await jwt.verify(token, secret);
    return user;

}