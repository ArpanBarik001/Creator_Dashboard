import express from "express";
import { user } from "../models/user.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/register", async(req,res)=>{
    try{
        const savedUser={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }

        savedUser.password=await bcrypt.hash(savedUser.password, 10);
        const newRegister=await user.create(savedUser);
        // console.log(newRegister);
        return res.status(201).json(newRegister);
    }catch(err){
        // console.log(err);
        res.status(500).json({error:err.massage})
    }
});

export default router;