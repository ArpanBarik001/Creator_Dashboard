import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signin() {
    const[name,setname]=useState('');
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');
    const navigate=useNavigate();
    const handlesignin=()=>{
        const data={
            name,
            email,
            password,
        };
        axios
        .post("http://localhost:5000/user/register",data)
        .then(()=>{
            navigate('/login');
        })
        .catch((error)=>{
            console.log(error);

        })
    }
  return (
    <div className='container'>
        <h1>signin</h1>

        <div>
        <p>Name</p>
        <input
        type='text'
        value={name}
        onChange={(e)=>setname(e.target.value)}
        />
      </div>
      <div>
      <p>Email</p>
        <input
        type='text'
        value={email}
        onChange={(e)=>setemail(e.target.value)}
        />
      </div>
      <div>
      <p>Password</p>
        <input
        type='password'
        value={password}
        onChange={(e)=>setpassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handlesignin}>Sign in</button>
      </div>
      <p>Already sign in?</p>
      <Link  to='/login'>
        <button>Login</button>
      </Link>
    </div>
  )
}
