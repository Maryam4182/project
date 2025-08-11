import authController from "./auth.controller.js";

export const controllers = function name() {

    return [
        new authController()
    ]  
}