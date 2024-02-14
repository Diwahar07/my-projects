import React from 'react'
import axios from 'axios'
import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
const Register = () => {

  const [input,setInput]=useState({
    username:"",
    email:"",
    password:""
  })
  
  const navigate=useNavigate();
  const [error,setError]=useState(null);

  const handlechange=(e)=>{
       setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
  }

  const handleclick=async (e)=>{
    e.preventDefault();
    try{
      await axios.post(" /auth/register",input);
      navigate('/login');
      
    }
    catch(err){
      setError(err.response.data);
    }
  }
  return (
    <div className='auth'>
    <h1>Register</h1>
    <form>
      <input required type="text" placeholder='username' name='username' onChange={handlechange}/>
      <input required type="email" placeholder='email' name='email' onChange={handlechange}/>
      <input required type="password" placeholder='password'  name='password' onChange={handlechange}/>
      { error && <p>{error}</p>} 
      <button onClick={handleclick}>Register</button>

      <span>Do you have an account?<Link to="/Login">Login</Link></span>
    </form>
  </div>
  )
}

export default Register
