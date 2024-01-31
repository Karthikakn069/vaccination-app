import React, { useEffect } from "react";
import vaccine from '../images/vaccine.png';
import {Link,useNavigate} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import Axios from "axios";
import {useState} from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
/* props => isBlurred userEmail */
function HeLinks(){
  return (
    <div className ="he-links">
          <Link to="/login"> Login </Link>
          <Link to ="/signup"> SignUp</Link>
    </div>
  )
};
function UserLinks({userEmail}){
  const [userName , setUserName] = useState('');
  Axios.get(`http://localhost:3001/user_name/${userEmail}`)
    .then((response) => {
    setUserName(response.data[0].username)
  });
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const butClick = (page) =>{
    navigate(`/vaccination/${page}/${userEmail}`);
    setAnchorEl(null);
  }
  const navigate = useNavigate();
  return (
    <div className="us-links">
      <PersonIcon className="us-icon" />
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {userName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => butClick('user_slots')}>View Booked Slots</MenuItem>
        <MenuItem onClick={()=> butClick('book_slots')}>Book Slots</MenuItem>
        <MenuItem onClick={()=>navigate('/')}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
function AdminHeader(){
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return(
    <div className ='header'>
        <div className = 'he-top ad-top'>
          <div>
            <img src={vaccine} alt ="logo" onClick={()=> navigate(`/`)} />
          </div>
          {/* <div className='ad-links'>
            <Link to='centre_manage'>Centre Management</Link>
            <Link to='user_manage'>User Management</Link>
          </div> */}
          <div className='ad-info'>
            <PersonIcon className="us-icon" />
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Admin
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={()=>navigate('/')}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
        <hr />
    </div>
  )
}
function Header(props){
  const navigate = useNavigate();
  const [userEmail,setUserEmail] = useState(props.userEmail);
  if(props.userEmail === 'admin'){
    return(
      <AdminHeader />
    )
  }
  return(
    <div className={`header ${props.isBlurred?'blur':''}`}>
      <div className="he-top">
        <img src={vaccine} alt="logo" onClick={()=> navigate(`/${props.userEmail}`)} />
        {props.admin === true ?<div></div> :<div></div>}
        {userEmail === undefined? <HeLinks /> : <UserLinks userEmail={userEmail} />}
      </div>
      <hr />
    </div>
  )
}
export default Header;