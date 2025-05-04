import { user } from "../models/user.js";
import bcrypt from 'bcrypt';

export const createAdminAccount=async()=>{
    try{
        const existAdmin=await user.findOne({email:"admin@test.com"});
        if(!existAdmin){
            const newAdmin={
                name:"Admin",
                email:"admin@test.com",
                password: await bcrypt.hash("admin",10),
                role:"admin"
            }
            const createAdmin=await user.create(newAdmin);
            console.log(createAdmin);
        }else{
            console.log("Admin already exist..");
        }

    }catch(error){
        console.log(error);
    }
}