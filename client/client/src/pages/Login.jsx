import React, { useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useState} from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authcontext';

const Login = () => {

  const [input,setInput]=useState({
    username:"",
  
    password:""
  });   
  
  const navigate=useNavigate();
  const [error,setError]=useState(null);

  const {login} =useContext(AuthContext);

  const handlechange=(e)=>{
       setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
      
  }
  
 
  const handlesubmit=async (e)=>{
   
    e.preventDefault();
    try{
       await login(input);
      await axios.post("/auth/login",input);
      navigate('/');
      
    }
    catch(err){
      console.log(err);
      setError(err.response.data);
    }
  }
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder='username' name='username' onChange={handlechange}/>
        <input  required type="password" placeholder='password'  name='password' onChange={handlechange}/>
        { error && <p>{error}</p>}
        <button onClick={handlesubmit}>Login</button>

        <span>Don't you have an account?<Link to="/Register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login;
