import { response } from 'express';
import baseService from './base.service';
import { createToken, decodeToken } from '../utils/jwt';
import bcrypt from 'bcrypt'
import { hashpassword, redirectUrl, randomPassword } from '../utils/genericsFunctions'
import { Env } from '../config'


export class authService extends baseService {

    constructor() {
        super();

    }

    async registerUser(userData) {
        const newUser = await this._userModel.create({
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
            isActive: userData.isActive,
            userType: userData.userType,
            isBlocked: userData.isBlocked,
            country: userData.country,
            isSubscriber: userData.isSubscriber,
        })



        if (newUser) {
            const token = createToken(newUser);
            let options = {}
            const loginLink = Env.Base_URL + '/url?action=login';
            options = {
                fullName: newUser.fullName,
                email: newUser.email,
                password: userData.password,
                loginLink: loginLink,
            }

         
            return [newUser, token];
        }
    }

    async isUserExist(email) {

        let user = await this._userModel.findOne({ where: { email: email } })
        if (user) {
            return user;
        }

        return undefined;
    }

    
    async login(email, password) {
        let user = await this._userModel.findOne({ where: { email: email } })
        if (!user) {
            return undefined;
        }

        if( user.isBlocked == false){
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                let message = 'Invalid Email Or Password'
                return {message}
            }
            else {
                const token = createToken(user);
                return [user, token];
            }
        }
        else{
            let message = 'Your account is blocked, please contact support for further details';
            return {message}
        }
    }

    async forgetpassword(userbody, userquery, key) {
        let id = '';
        if(key == 'forgetpassword'){
            const decodToken = decodeToken(userquery.token)
            id = decodToken._id
        }
        const where = (key === 'forgetpassword') ? { id: id } : (key === 'changepassword') ? { email: userbody.email } : {};

        console.log(where)
        let user = await this._userModel.findOne(          
            {
                where: where
            }
        )

        if (!user) {
            return undefined;
        }
        else {
            const hashpass = await hashpassword(userbody.password);
            const token = createToken(user);
            const updatepassword = await this._userModel.update({ password: hashpass }, { where: { id: user.id } })
            console.log(updatepassword)
            return [user, token]
        }
    }

    async getSingleUserByEmail(userEmail) {

        let user = await this._userModel.findOne(
            {

                where: { email: userEmail }

            }
        )

        if (user) {
            const token = createToken(user);
            let options = {}
            const forgotPasswordUrl = await redirectUrl('/url', token.token, 'reset', options);
            options = {
                email: user.email,
                link: forgotPasswordUrl
            }

           return [user, token];
        }
        else {
            return undefined;
        }

    }

    async updateAffiliateCode(req){
        const updatedCode =  await this._userModel.update(
        {
            fullName: req.body.name,
            affiliateCode: req.body.affiliate_code
        }, 
        {   returning:true,
            where: { id: req.userData._id}
        });
        
        return updatedCode[1][0].get();
    }
}