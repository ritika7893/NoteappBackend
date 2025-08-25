import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export async function createUser(req,res){
    try{
           const {name,email,mobile,password}=req.body
           if(!name||!email||!password||!mobile){
            return res.status(400).json({message:"All field are required"})
           }
        const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
           const hassedPassword= await bcrypt.hash(password,10)
            const newUser=new User({name,email,mobile,password:hassedPassword})
           const savedUser=await newUser.save()
          res.status(201).json({message:"User created successfully",savedUser})
    }
    catch(error){

        res.status(500).json({message:"Internal Server Error"})
        console.error("Error in createUser",error)
    }
}
import mongoose from "mongoose";

export async function loginUser(req, res) {
  try {
    const { email,password} = req.body;
      if(!email||!password){
            return res.status(400).json({message:"All field are required"})
           }
   
    const user=await User.findOne({email})



    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatched=await bcrypt.compare(password,user.password)
     if (!isMatched) {
      return res.status(404).json({ message: "Invalid Credential" });
    }
    const payload={id:user.id,email:user.email}
    const token=jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn:process.env.JWT_EXPIRES})
     res.status(200).json({ message: "Login Successfully" ,user,token});
 
  } catch (error) {
    console.error("Error in Login", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

