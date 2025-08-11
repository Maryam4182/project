import express from "express";
import { authService } from "../services/auth.service.js";
 import { responseTemplate } from "../enums/responseTemplate.enum.js";


class baseController {

    router;
    parentRouterPath;
    _authService;
    _responseTemplate;

    constructor(routerPath){

        this.parentRouterPath = routerPath;
        this.router = express.Router();
        this._authService = new authService()
        this._responseTemplate = responseTemplate;
    }
}

export default baseController;