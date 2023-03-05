
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/TokenManager.js";
export const register  =  async (req,res)=>{
    const {email,password} = req.body;
     try {
        //alternative searching by email
    let  user =  await User.findOne({email});
      if (user) throw ({code:11000})
      user = new User ({email,password});
        await user.save();
//Generar el token con JWT
        return res.status(201).json({ok:true});
     } catch (error) {
      console.log(error);
      //mongoose default alternative
      if(error.code===11000){
         return res.status(400).json({error:"Ya existe este usuario"});
      }
      return res.status(500).json({error:"Error del servidor"});
     }
};
export const login  =  async (req,res)=>{   
   const {email,password} = req.body;
   try {
   let  user =  await User.findOne({email});
   if(!user) 
   return res.status(400).json({error:"No existe este usuario"});
    const resultPassword = await user.comparePassword(password);
    if(!resultPassword){
    return res.status(400).json({error:"Contraseña incorrecta"});
    }
    //Generar el token con JWT
   const {token,expiresIn}= generateToken(user.id);
  
    res.cookie("token",token,{
      httpOnly:true,
      secure:!(process.env.MODO==="developer")
    });
    

    return res.json({token,expiresIn});
   } catch (error) {
      console.log(error);
      return res.status(500).json({error:"Error del servidor"});
   }
};

export const infoUser =  async (req,res)=>{
   try {
      const user  = await User.findById(req.uid).lean();
      return  res.json({email:user.email , uid:user.uid});
   } catch (error) {
      
      return res.status(500).json({error:"Internal server"})
   }
};







