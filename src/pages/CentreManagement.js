import React from "react";
import { useState,useEffect } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {DataGrid} from '@mui/x-data-grid';
import Axios from "axios";
import '../css/admin.css';
import {useNavigate} from "react-router-dom";
import {TimePicker} from 'react-time-picker';
function Table({columns,data,rowSelect}){
  return(
    <div className ='cen-tab-out'>
      <div className ='cen-tab'>
        <DataGrid rows={data} columns={columns}
            initialState={{...data.initialState, pagination :{paginationModel :{pageSize :5}},}} pageSizeOptions={[5,10,25]}
            disableRowSelectionOnClick 
            disableColumnSelector   />
      </div>
    </div>
    
  )
}
function CentreAddition({data}){
  const [location,setLocation] = useState('');
  const [name,setName] = useState('');
  const[address,setAddress] = useState('');
  const navigate = useNavigate();
  let id = -1;
  for(var i =0;i<data.length;i++){
    if(data[i]['id'] !== i+1){
      id =i+1;
      break;
    } 
  }
  if(id === -1){
    id=data.length+1;
  }
  const newCentre = ()=>{
    if(location === '' || name === '' || address === ''){
      return(alert('Please enter all information'));
    }
    return(Axios.post("http://localhost:3001/centre_addition" ,{id,location,name,address}));
  }
  const removeCentre = (cid) => {
    Axios.delete(`http://localhost:3001/centre_delete/${cid}`);
    navigate(0);
  }
  const columns = [
    {field : 'id' , headerName :'Centre Id' , width : 150},
    {field : 'Name_of_the_Location' , headerName : 'Location' , width:150 },
    {field : 'Vaccination_Centre' , headerName : 'Vaccination Center' , width : 300},
    {field : 'Address' , headerName : 'Address' , width : 350},
    {field :'Slot' , headerName : 'Remove Slot' , renderCell : (cellValues) => {
      return (<button value = {cellValues} className="rem-but" onClick ={()=>{
        removeCentre(cellValues['row']['id']);
      }}>Remove Centre</button>)} ,disableClickEventBubbling: true, filterable : false , width : 200},
  ]
  return(
    <div>
      <div>
        <h3>Add Centre</h3>
      </div>
      <form className='cen-man-form'>
        <label htmlFor='cen-location'>Centre Location :</label>
        <input type='text' id='cen-location' name='cen-location' onChange ={(e)=>{setLocation(e.target.value)}}/>
        <label htmlFor= 'cen-name'>Centre Name :</label>
        <input type="text" name="cen-name" id="cen-name" onChange ={(e)=>setName(e.target.value)} />
        <label htmlFor="cen-address">Centre Address :</label>
        <input type="text" name="cen-address" id="cen-address" onChange = {(e)=>setAddress(e.target.value)} />
        <button type="submit" value="Add Centre" onClick ={newCentre}>Submit</button>
      </form>
      <Table columns = {columns} data = {data} rowSelect={true} />
    </div>
  )
}
function SlotsAddition({data}){
  const [centreName , setCentreName] = useState('');
  const [slots,setSlots] = useState([]);
  const [slotTime,setSlotTime] = useState('');
  const [cid,setCid] = useState('');
  const [addSlot,setAddSlot] = useState('');
  const navigate = useNavigate();
  const selectClick = ({centreName,id}) => {
    setCentreName(centreName);
    Axios.get(`http://localhost:3001/slot_time/${id}`)
    .then((response) => {
      setCid(id);
      if(response.data[0] !== undefined && response.data[0]['slot_time'] !== ''){
        setSlotTime(response.data[0]['slot_time']);
      }
      setSlots(response.data.map ((slot)=> {  
        return (<option value={slot['slot_time']} key = {slot['slot_time']}>{slot['slot_time']}</option>)
      }));
    });
  }
  function RemoveSlots(){
    const remChange = (e) => {
      setSlotTime(e.target.value);
    }
    const deleteSlot = () => {
      if(slotTime === '' || slots[0]['key'] === undefined){
        return (alert('Select a Slot from a centre'));
      }
      Axios.delete(`http://localhost:3001/slot_delete/${cid}/${slotTime}`);
      navigate(0);
    }
    return(
      <div>
        <select name="slot-time" id="slot-time" size='1' value={slotTime} onChange={remChange} style={{height:'25px'}} >
          {slots}
        </select>
        <button onClick = {deleteSlot}>Remove Slot</button>
      </div>
    )
  }
  const columns = [
    {field : 'id' , headerName :'Centre Id' , width : 150},
    {field : 'Name_of_the_Location' , headerName : 'Location' , width:150 },
    {field : 'Vaccination_Centre' , headerName : 'Vaccination Center' , width : 300},
    {field : 'Address' , headerName : 'Address' , width : 350},
    {field : 'Slots_Available' , headerName : 'Slots Available' , width :150},
    {field :'Slot' , headerName : 'Select Slot' , renderCell : (cellValues) => {
      return (<button value = {cellValues} className="asl-but" onClick ={()=>{
        const seObj = {centreName: cellValues['row']['Vaccination_Centre'] , id : cellValues['row']['id']};
        selectClick(seObj);
      }}>Select</button>)} ,disableClickEventBubbling: true, filterable : false , width : 150},
  ]
  function AddSlots(){
    const addCentreSlot = () => {
      if(cid === ''){
        return (alert('Select a centre'));
      }
      if(addSlot === ''){
        return (alert('Select Time'));
      }
      Axios.post(`http://localhost:3001/slot_add`,{id:cid,slot_time:addSlot})
      .then((res)=>{
        console.log(res.data);
        navigate(0);
      })
    }
    return(
      <div className="add-sl-ti">
        {/* <input type="time" name="add-time" id="add-time" onChange={(e)=>{setAddSlot(e.target.value)}}/> */}
        <TimePicker onChange = {(e)=> {
          setAddSlot(e)
          e = addSlot;
          }} name="add-time" id="ad-time" className='time-picker' clearIcon={null} clockIcon={null} format="HH:mm" value ={addSlot}  />
        <button onClick={addCentreSlot}>Add slot</button>
      </div>
    )
  }
  return(
    <div>
      <div><h3>Centre Name : {centreName}</h3></div>
      <div className="rem-slot">Remove slots : <RemoveSlots /></div>
      <div className="add-slot">Add slots : <AddSlots /></div>
      <div>
        <Table data={data} columns = {columns} rowSelect={false} /> 
      </div>
    </div>
  )
}
function CentreManagement(){
  const [centreRender , setCentreRender] = useState(true);
  const [data,setData] = useState({});
  useEffect(()=>{
    Axios.get('http://localhost:3001/centre_manage_tab')
    .then((response)=>{
      setData(response.data);
    })
  },[])
  return(
    <div className='admin-out'>
      <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group" className="ce-radio">
        <FormControlLabel value="female" control={<Radio />} label="Add Centre" onChange={()=>{setCentreRender(true)}} />
        <FormControlLabel value="male" control={<Radio />} label="Add Slots" onChange={()=>{setCentreRender(false)}}/>
      </RadioGroup>
      </FormControl>
      {centreRender === true ?<CentreAddition data = {data} /> : <SlotsAddition data = {data} />}
    </div>
  )
}
export default CentreManagement;