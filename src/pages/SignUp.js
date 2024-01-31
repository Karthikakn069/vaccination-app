import React from 'react';
import{useState,useEffect} from 'react';
import '../css/signup.css';
import loginImage from '../images/login.png';
import { Link , useNavigate } from 'react-router-dom';
import Axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
function Error(props){
  return <p style= {{"display":"flex" , "justifyContent" : "center" , color:'red' , fontSize :'13px'}}>{props.value}</p>
}
function SignUp(){
  const navigate = useNavigate();
  const submitCheck = (e) => {
    e.preventDefault();
    if(name === '' || mail === '' || pass ===''){
      return setErr('Please fill in all the fields');
    }
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(pattern.test(mail) === false){
      return setErr('Enter Appropriate Mail id');
    }
    Axios.post('http://localhost:3001/insert_info' ,{name : name ,mail : mail ,pass : pass})
    .then((response)=>{
      console.log(response);
      if(response.data.errno > 0){
        setErr('Email already taken');
      }
      else{
        setErr('');
        navigate(`/${mail}`);
      }
      
    })
    .catch((err)=> {
      return(setErr('Email already taken'));
    })
  }
  const[name,setName] = useState('');
  const[mail,setMail] = useState('');
  const[pass,setPass] = useState('');
  const[err,setErr] = useState('');
  return(
    <div className ="sign-outer">
      <CloseIcon className='sig-exit' onClick = {()=>{navigate(`/`)}} />
      <div className='sign-inner'>
        <div className='sign-top'>
          <img src ={loginImage} alt ="user" />
          <h4>Sign Up</h4>
        </div>
        <form className='sign-input'>
          <h6>Email id:</h6>
          <input type="email" placeholder='Enter Email' onChange={(e)=>{setMail(e.target.value)}} />
          <h6>Username:</h6>
          <input type="text" placeholder='Enter Username' onChange={(e) => setName(e.target.value)} />
          <h6>Password:</h6>
          <input type="password" placeholder="Enter Password" onChange={(e)=>{setPass(e.target.value)}} />
          <Error value ={err} />
          <button value="SignUp" id = "submit" onClick={submitCheck} className='log-but'>Submit</button>
        </form>
        <div className='sign-mem'>
          <p> Already Signed Up? <Link to={`/login`}>Login</Link></p>
        </div>
      </div>
    </div>
  )
}
export default SignUp;