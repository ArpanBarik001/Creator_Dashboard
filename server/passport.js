import { Strategy as jwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";
const user=mongoose.model('User');
import { secretOrkey } from "./keys.js";

// import { Passport } from "passport";
import passport from "passport";


export const password=()=>{
const opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=secretOrkey;
    passport.use(
        new jwtStrategy(opts, async(jwt_payload, done)=>{
            try{
                const User=await user.findById(jwt_payload.id);
                if(User){
                    return done(null, User);
                }else{
                    return done(null, false);
                }

            }catch(error){
                return done(error, false);
                
            }
        })
    );
};

export default passport;