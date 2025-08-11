
import {UserModel } from "../models";

class baseService {
    
    _userModel;

    constructor(){
        this._userModel = UserModel
    }

}

export default baseService;