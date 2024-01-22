import React from 'react';
import Axios from "axios";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import {DataGrid} from '@mui/x-data-grid';
function UserSlots(){
  const [data , setData] = useState({});
  const{mail} = useParams();
  useEffect(()=>{
    Axios.get(`http://localhost:3001/user_booked/${mail}`)
    .then((response)=>{setData(response.data);})
    .catch((error)=>{
      setData({});
    });
  },[mail])
  if(data.length === 0){
    return(
      <div>User has not booked any slots</div>
    )
  }
  console.log(data);
  const columns = [
    {field : 'Vaccination_Centre' , headerName : 'Vaccination Center' , width : 200},
    {field : 'Name_of_the_Location' , headerName : 'Location' , width:150 },
    {field : 'Address' , headerName : 'Address' , width : 350},
    {field : 'slot_time' , headerName :'Slot Time'  , filterable : false , width : 150},
  ]
  return(
    <div className='vac-table-out'>
      <div className='vac-table' style={{width:'75%',margin:'40px 10px 10px 10px'}}>
        <DataGrid disableRowSelectionOnClick disableColumnSelector rows={data} columns={columns}
         initialState={{...data.initialState, pagination :{paginationModel :{pageSize :10}},}} pageSizeOptions={[5,10,25]}  />
      </div>
    </div>
  )

}
export default UserSlots;