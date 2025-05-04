import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login() {
        const[email,setemail]=useState('');
        const[password,setpassword]=useState('');
        const navigate=useNavigate();
        const token = localStorage.getItem("token");
        const handlelogin=()=>{
            const data={
                email,
                password,
            };
            axios
            .post("http://localhost:5000/auth/login",data)
            .then((response)=>{
                localStorage.setItem("token",response.data.token);
                localStorage.setItem("userRole",response.data.user.role);
                navigate('/dashboard');
            })
            .catch((error)=>{
                console.log(error);
    
            })
        }
        const headers = {
            Authorization: `${token}`
          };
            const triggerAction = async (path) => {
                try {
                  await axios.post(`http://localhost:5000/auth/earn/${path}`, {}, { headers });
                //   setMessage(res.data.message);
                alert("Earn credit succesfully +10");
                } catch (err) {
                  console.log("Action failed");
                }
              };
  return (
    <div className='container'>
        <h1>Login</h1>
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
        <button onClick={() => {triggerAction("daily-login"); handlelogin()}}>Login</button>
      </div>
    </div>
  )
}
