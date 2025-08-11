import bcrypt from 'bcrypt'
import { Env } from '../config'
import url from 'url';
const crypto = require('crypto');


export async function hashpassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds, 'a');
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

export function randomPassword() {
    const length = 6;
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomDigit = Math.floor(Math.random() * 10); // Generate a random digit (0-9)
        password += randomDigit;
    }

    return password;
}



export async function redirectUrl(path, token, type, options) {
    const baseUrl = Env.Base_URL;
    //var baseUrlStr = baseUrl.toString();
    const _Path = path;
    const redirectUrl = url.resolve(baseUrl, `${_Path}?action=${type}&token=${token}`);
    return redirectUrl;
}


// Function to encrypt a string
/*export async function encryptString(text, secretKey) {
  const algorithm = 'aes-256-cbc'; // You can choose other AES algorithms as well.
  const iv = crypto.randomBytes(16); // Initialization vector - should be unique and random for each encryption.

  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  let encryptedData = cipher.update(text, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');

  const encrypted = iv.toString('hex') + encryptedData;
  return encrypted;
}

export async function decryptString(encryptedText, secretKey) {
    const algorithm = 'aes-256-cbc'; // Make sure it matches the algorithm used during encryption.
  
    const iv = Buffer.from(encryptedText.slice(0, 32), 'hex');
    const encryptedData = encryptedText.slice(32);
  
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
  
    return decryptedData;
  }*/
