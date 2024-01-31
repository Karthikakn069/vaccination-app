import React from 'react';
import vaccineLogo from '../images/100crore.jpg'
import '../css/home.css'
import { Link , useNavigate } from 'react-router-dom';
function Home(props){
  const navigate = useNavigate();
  const handleClick = ()=>{
    if(props.userEmail === undefined){
      return alert('Please LogIn or Signup to view Bokked Slots');
    }
    else {
      return navigate(`/vaccination/book_slots/${props.userEmail}`);
    }
  }
  return(
    <div className={`home-outer ${props.isBlurred?'blur':''}`}>
      <div className='home-inner'>
        <div className='hi-left'>
          <h3>Over 100 crore people in India has been vaccination. Are you ready to be one of them</h3>
          <Link onClick = {handleClick}>Book Slot &rarr;</Link>
        </div>
        <div className='hi-right'>
          <img src={vaccineLogo} alt = '100crore-Logo'></img>
       </div>
      </div>
      
    </div>
  )
}
export default Home;