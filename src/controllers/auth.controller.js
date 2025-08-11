import baseController from "./base.controller"
import { authMiddleware, validationMiddleware } from '../middleware';
import { alreadyExistException } from "../exceptions";
import { affiliateCodeDto, CreateUserDto, LogInUserDto, GetSingleUserByEmailDto, forgetpassword, changepassword } from "../dtos";
import userNotAuthorizaedException from "../exceptions/userNotAuthorizaed.exception";

class authController extends baseController {

    constructor() {
        super('/auth')
        this.initializeRouter()

    }

    initializeRouter() {

        this.router.post(`${this.parentRouterPath}/registeruser`, validationMiddleware(CreateUserDto), this.registerUser)
        this.router.post(`${this.parentRouterPath}/login`, validationMiddleware(LogInUserDto), this.login)
        this.router.post(`${this.parentRouterPath}/me`, validationMiddleware(GetSingleUserByEmailDto), this.getSingleUserByEmail)
        this.router.post(`${this.parentRouterPath}/forgotpassword`, validationMiddleware(forgetpassword), (req, res, next) => this.forgetpassword(req, res, next, 'forgetpassword'))
        this.router.post(`${this.parentRouterPath}/changepassword`, validationMiddleware(changepassword), authMiddleware(), (req, res, next) => this.forgetpassword(req, res, next, 'changepassword'))
        this.router.post(`${this.parentRouterPath}/update_affiliate_code`, validationMiddleware(affiliateCodeDto),  authMiddleware(), this.updateAffiliateCode);
    }

    forgetpassword = async (req, res, next, key) => {
        try {

            const updatepassword = await this._authService.forgetpassword(req.body, req.query, key)

            if (updatepassword) {

                res.status(200).send(this._responseTemplate('Success', updatepassword, undefined))

            } else {

                res.status(404).send(this._responseTemplate('Error', undefined, 'Invalid Email'))

            }

        } catch (error) {

            next(error)
        }
    }

    registerUser = async (req, res, next) => {

        try {
            const user = await this._authService.isUserExist(req.body.email)
            if (user) {
                res.status(400).send(this._responseTemplate('Error', undefined, 'User Exists!'))

            } else {            
                const userData = await this._authService.registerUser(req.body)
                res.send(this._responseTemplate('Success', userData, undefined))
            }

        } catch (error) {
            next(error)
        }

    }

    login = async (req, res, next) => {
        try { 
                
            const user = await this._authService.login(req.body.email, req.body.password)
            if(user != undefined){
                if(user.message != undefined){
                    res.status(400).send(this._responseTemplate('Error', undefined, user.message))
                }
                else {
                    res.status(200).send(this._responseTemplate('Success', user, undefined))
                }
            }
            else{
                res.status(400).send(this._responseTemplate('Error', undefined, 'User Not Exist'))
            }

        } catch (error) {
            next(error)
        }
    }


    getSingleUserByEmail = async (req, res, next) => {

        try {

            if (req.userData)
                new userNotAuthorizaedException()

            const user = await this._authService.getSingleUserByEmail(req.body.email)

            if (user) {

                res.status(200).send(this._responseTemplate('Success', user, undefined))

            } else {

                res.status(400).send(this._responseTemplate('Error', undefined, 'User Not Exist'))

            }

        } catch (error) {

            next(error)
        }

    }


    updateAffiliateCode = async(req, res, next) => {
        try {             
           
            const Data = await this._authService.updateAffiliateCode(req);
            res.send(this._responseTemplate('Success', Data, undefined))
        } catch (error) {
            next(error)
        }
    }

}

export default authController