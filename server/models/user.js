import mongoose from "mongoose";

const creditLogSchema = new mongoose.Schema({
    reason: String,
    points: Number,
    date: {
      type: Date,
      default: Date.now
    }
  });

const userSchema=mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin","customer"],
        default:"customer"
    },
    credits: {
        type: Number,
        default: 0
      },
    
    creditLog: [creditLogSchema],
    
    lastLogin: {
        type: Date
      },
    
    profileCompleted: {
        type: Boolean,
        default: false
      },
    
    savedPosts: [
        {
          postId: String,
          title: String,
          permalink: String,
          thumbnail: String,
          selftext: String,
        },
      ],
    reportedPosts: [
        {
          postId: String,
          title: String,
          permalink: String,
          thumbnail: String,
          selftext: String,
        },
      ],

}
);

export const user=mongoose.model('User',userSchema);