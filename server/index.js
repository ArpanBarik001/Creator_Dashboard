import express from 'express';
import mongoose from 'mongoose';
import { MongodbUrl } from './config.js';
import signup from './routes/signup.js';
import login from './routes/login.js';
import passport from 'passport';
import { password } from './passport.js';
// import path from 'path';
// import {fileURLToPath} from 'url';
// const _filename = fileURLToPath(import.meta.url);
// const _dirname = path.dirname(_filename);

import cors from 'cors';
import { createAdminAccount } from './service/admin.js';

const app = express();

// app.use(express.static(path.join(_dirname, '../client/build')));
// app.get('*',(req, res)=>{
//     res.sendFile(path.join(_dirname, '../client/build', 'index.html'));
// });
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
