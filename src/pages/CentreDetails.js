import React from 'react';
import {useState,useEffect} from 'react';
import {useParams , useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../css/centredetails.css'
import CloseIcon from '@mui/icons-material/Close';

function CentreDetails(props){
  const {mail,id} = useParams();
  const [data,setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get(`http://localhost:3001/centre/${id}`)
        .then((response) => {
          setData(response.data);
          //console.log(response.data);
    });   
  },[id]);
  const slots = [];
  for(const i in data){
    slots.push(<li key ={i}><input type ="checkbox" value = {data[i]['slot_time']} id = {i} />{data[i]['slot_time']}</li>);
  };
  const centre = data['0'] || "loading";
  const submit = ()=>{
    for(const i in slots){
      const val = document.getElementById(i);
      if(val.checked){
        Axios.post('http://localhost:3001/user_book' , {email : mail , id : id , slot_time : val.value})
        .then((response)=>{
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        })
        Axios.delete(`http://localhost:3001/delete_slots/${id}/${val.value}`).then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
    navigate(`/vaccination/book_slots/${mail}`);
    window.location.reload();
  }
  if(centre !== "loading"){
    return (
      <div className='cen-det'>
        <CloseIcon className='cen-det-exit' onClick ={()=> {navigate(`/vaccination/book_slots/${mail}`)}} />
        <div>
          <h3>Location : {centre['Name_of_the_Location']}</h3>
          <h3>Centre : {centre['Vaccination_Centre']}</h3>
          <h3>Address : {centre['Address']}</h3>
        </div>
        <div className ='cen-det-2'>
          <ul><h3>Slots Available</h3>
            {slots}
          </ul>
        </div>
        <button onClick = {submit} className='bks-but'>Book Slot</button>      
      </div>
    )
  }
}
export default CentreDetails;