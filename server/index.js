import express from 'express';
import mongoose from 'mongoose';
import { MongodbUrl } from './config.js';
import signup from './routes/signup.js';
import login from './routes/login.js';
import passport from 'passport';
import { password } from './passport.js';

import cors from 'cors';
import { createAdminAccount } from './service/admin.js';

const app = express();

app.use(passport.initialize());
password();

const PORT=process.env.PORT||5000;

app.use(express.json());
app.use(cors());


createAdminAccount();


app.use('/user', signup);
app.use('/auth',login);

mongoose.connect(MongodbUrl)
.then(()=>{
console.log('succesfully connected database...')
app.listen(PORT,()=>{
    console.log(`server is listening on port${PORT}`);
})
})
.catch((error)=>{
    console.log(error);
})