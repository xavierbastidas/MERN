import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/TokenManager.js";
export const requireRefreshToken = (req,res,next)=>{
 try {
    const  refreshTokenCookie = req.cookies.refreshToken;
    if(!refreshTokenCookie)throw new Error("The token does not exist");
   const {uid} = jwt.verify(refreshTokenCookie,process.env.JWT_REFRESH);
   req.uid = uid;
   next();
 } catch (error) {
   res.status(401).json({error:tokenVerificationErrors[error.message]});
 }
};
