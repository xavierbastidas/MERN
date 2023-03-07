
import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/TokenManager.js";
export const register  =  async (req,res)=>{
    const {email,password} = req.body;
     try {
    let  user =  await User.findOne({email});
      if (user) throw ({code:11000})
      user = new User ({email,password});
        await user.save();
const {token,expiresIn}= generateToken(user.id);
generateRefreshToken(user.id,res);
        return res.status(201).json({token,expiresIn});
     } catch (error) {
      console.log(error);
      //mongoose default alternative
      if(error.code===11000){
         return res.status(400).json({error:"This user already exists"});
      }
      return res.status(500).json({error:"Server error"});
     }
};
export const login  =  async (req,res)=>{   
   console.log("Entro aqui===???");
   const {email,password} = req.body;
   try {
   let  user =  await User.findOne({email});
   if(!user) 
   return res.status(400).json({error:"This user does not exist"});
    const resultPassword = await user.comparePassword(password);
    if(!resultPassword){
    return res.status(400).json({error:"Incorrect password"});
    }
   const {token,expiresIn}= generateToken(user.id);
   generateRefreshToken(user.id,res)
    return res.json({token,expiresIn});
   } catch (error) {
      console.log(error);
      return res.status(500).json({error:"Server error"});
   }
};

export const infoUser =  async (req,res)=>{
   try {
      const user  = await User.findById(req.uid).lean();
      return  res.json({email:user.email , uid:user.uid});
   } catch (error) {
      
      return res.status(500).json({error:"Internal server"});
   }
};

export const refreshToken = (req, res)=>{

 try { 
    const{token,expiresIn}= generateToken(req.uid);
   return res.json({token,expiresIn});
 } catch (error) {
   return res.status(500).json({error:"Internal server"})
}
};

export const logout  = (req,res)=>{
   res.clearCookie('refreshToken');
   res.json({ok:true});
};


