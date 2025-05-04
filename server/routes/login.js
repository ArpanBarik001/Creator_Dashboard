import express from 'express';
import jwt from 'jsonwebtoken';
import { secretOrkey } from '../keys.js';
import { user } from "../models/user.js";
import bcrypt from 'bcrypt';
import passport from 'passport';

const router=express.Router();




router.post('/login', async(req, res)=>{
    try{

        const find=await user.findOne({email:req.body.email});
        if(!find){
            return res.status(500).json('User not found..');
        }
        const isMatch=await bcrypt.compare(req.body.password, find.password);
        if(isMatch){
            const payload={id:find._id, email:find.email, role:find.role};

            jwt.sign(payload, secretOrkey, {expiresIn: 3600}, (err, token)=>{
                if(err) throw err;
                res.json({
                    success: true,
                    token: 'bearer' +" "+token,
                    user:{
                        email:find.email,
                        role:find.role
                    }
                });

            });


            
        }else{
            
            return res.status(500).json('Password not match');
        }



    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

router.post("/save-post", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
      const { post } = req.body;
      const existing = req.user.savedPosts.find((p) => p.postId === post.postId);
      if (existing) return res.status(400).json({ message: "Post already saved" });
  
      req.user.savedPosts.push(post);
      await req.user.save();
      res.json({ message: "Post saved successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.post("/report-post", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
      const { post } = req.body;
      const existing = req.user.reportedPosts.find((p) => p.postId === post.postId);
      if (existing) return res.status(400).json({ message: "Post already reported" });
  
      req.user.reportedPosts.push(post);
      await req.user.save();
      res.json({ message: "Post reported successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.get("/saved-posts", passport.authenticate("jwt", { session: false }), async (req, res) => {
    res.json(req.user.savedPosts);
});

router.get("/reported-posts", passport.authenticate("jwt", { session: false }), async (req, res) => {
    res.json(req.user.reportedPosts);
});

router.post("/earn/daily-login", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
      const now = new Date();
      const lastLogin = req.user.lastLogin || new Date(0);
      const oneDay = 1000 * 60 * 60 * 24;
  
      if ((now - lastLogin) > oneDay) {
        req.user.credits += 10;
        req.user.lastLogin = now;
        req.user.creditLog.push({ reason: "Daily login", points: 10 });
        await req.user.save();
        return res.json({ message: "10 credits added for daily login." });
      }
  
      res.json({ message: "Already claimed today." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // 🔹 Earn credits for completing profile
  router.post("/earn/complete-profile", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
      if (!req.user.profileCompleted) {
        req.user.credits += 20;
        req.user.profileCompleted = true;
        req.user.creditLog.push({ reason: "Profile completed", points: 20 });
        await req.user.save();
        return res.json({ message: "20 credits added for profile completion." });
      }
  
      res.json({ message: "Profile already completed." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // 🔹 Earn credits for interacting with Reddit feed
  router.post("/earn/feed-interaction", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
      req.user.credits += 5;
      req.user.creditLog.push({ reason: "Interacted with Reddit feed", points: 5 });
      await req.user.save();
      res.json({ message: "5 credits added for feed interaction." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // 🔹 Get current user's credit balance and log
  router.get("/credits", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
      res.json({
        credits: req.user.credits,
        creditLog: req.user.creditLog || []
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        // Allow access only if the logged-in user is an admin
        if (req.user.role !== "admin") {
          return res.status(403).json({ message: "Access denied. Admins only." });
        }
  
        const users = await user.find();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
    }
  );
export default router;