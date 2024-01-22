import React from 'react';
import {useState , useEffect} from 'react';
import '../css/login.css';
import loginImage from '../images/login.png';
import {Link,useNavigate} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import Axios from "axios";
function Login(){
  const [data , setData] = useState({});
  const [mail , setMail] = useState('');
  const [pass , setPass] = useState('');
  const navigate = useNavigate();
  const [errmsg , setErrmsg] = useState('');
  useEffect(() => {
    Axios.get("http://localhost:3001/login_info").then((response) => {
      setData(response.data);
  },[]);
  })
  const info = [];
  for (const i in data){
    info.push(data[i]);
  }
  function Error(props){
    if(props.value){
      return(
        <p style={{"display":"flex" , "justifyContent" : "center" , color:'red' , fontSize :'13px'}}>{errmsg}</p>
      )
    }
  };
  const LoginCheck = (e) =>{
    e.preventDefault();
    if(mail === ''){
      return setErrmsg('Enter the mail Id');
    }
    if(pass === ''){
      return setErrmsg('Enter the password');
    }
    if(mail === 'admin' && pass === 'admin123'){
      navigate(`/admin/centre_manage`);
    }
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(pattern.test(mail) === false){
      return setErrmsg('Enter Appropriate Mail id');
    }
    for(const i in info){
      if((info[i].mail_id === mail) && info[i].password === pass){
        setErrmsg('');
        return navigate(`/${info[i].mail_id}`);
      }
    }
    return setErrmsg('Mail id and Password does not match');
  }
  return(
    <div className ="login-outer">
      <CloseIcon className='log-exit' onClick = {()=>{navigate(`/`)}} />
      <div className='login-inner'>
        <div className='login-top'>
          <img src ={loginImage} alt ="user" />
          <h4>Login</h4>
        </div>
        <form className='login-input'>
          <h6>UserEmail:</h6>
          <input type="email" placeholder='Enter Email' onChange={(e) => {setMail(e.target.value)}} />
          <h6>Password:</h6>
          <input type="password" placeholder="Enter Password" onChange={(e)=> {setPass(e.target.value)}} />
          <Error value={errmsg} />
          <button type="submit" value="Login" id = "submit" onClick={LoginCheck} className='log-but'>Login</button>
        </form>
        <div className='sign-mem'>
          <p> New member? <Link to={`/signup`}>SignUp</Link></p>
        </div>
      </div>
    </div>
  )
}
export default Login;
