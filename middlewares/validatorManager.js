import { validationResult , body, param} from "express-validator";
import axios from "axios";
export const validationResultExpress = ((req,res,next)=>{
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();
});

export const bodyRegisterValidator  = [
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
         }
         ),
         validationResultExpress
    ]


export const paramLinkValidator = [
    param("id","invalid format (expressValidator)")
    .trim()
    .notEmpty()
    .escape(),
    validationResultExpress
]


export const bodyLinkValidator = [
  body("longLink"," incorrect form  link ")
  .trim()
  .notEmpty()
  .custom( async value=>{
   try {
    if (!value.startsWith('https://')) {
    value ="https://"+value;
    }
    await  axios.get(value);
     return value;
   } catch (error) {
    //console.log(error);
    throw new Error('not found longlink 404');
   }
  }),
  validationResultExpress,
]



export const bodyLoginValidator = [
    body('email',"Incorrect format")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body("password","Min 6 characters")
    .trim()
    .isLength({min:8}),
    validationResultExpress,
]

