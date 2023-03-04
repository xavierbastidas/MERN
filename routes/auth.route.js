import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import {body} from 'express-validator';
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
const router = Router();
router.post('/register',[
    body('email',"Incorrect format")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body("password","Min 6 characters")
    .trim()
    .isLength({min:8}),
    body("password","Incorrect password")
     .custom((value,{req})=>{
        if(value!==req.body.repassword){
            throw new Error('Passwords do not match');
        }
        return value;
     })
],
validationResultExpress,
register);


router.post('/login',[
    body('email',"Incorrect format")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body("password","Min 6 characters")
    .trim()
    .isLength({min:8})
],
validationResultExpress,
login);
export default router
