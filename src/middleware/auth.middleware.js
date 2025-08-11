import userNotAuthorizaedException from "../exceptions/userNotAuthorizaed.exception";
import { UserModel } from "../models";
import { verifyToken } from "../utils/jwt";


export function authMiddleware(isSkipAuthorization = false) {

  return async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
      next(new userNotAuthorizaedException())
    else {

      try {

        const user = await verifyToken(token);
        if (user) {
          const user_id = user._id;

          let isUserExist = await UserModel.findByPk(user_id)
          
          if (!isUserExist) {

            next(new userNotAuthorizaedException())

          }

          req.userData = user
          next()

        }
        else {

          next(new userNotAuthorizaedException())

        }
      } catch (error) {
        next(error)
      }
    }
  }
}

export const conditionalAuthMiddleware = (req, res, next) => {
  
  if (req.body.userType !== 'all') {
    return authMiddleware()(req, res, next);
  }
  next();
};