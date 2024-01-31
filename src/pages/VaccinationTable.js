import React from 'react';
import {useState,useEffect} from 'react';
import Axios from 'axios';
import {DataGrid} from '@mui/x-data-grid';
import { useNavigate, useParams , Outlet , useLocation} from 'react-router-dom';
import '../css/vaccination_table.css'
function Table(props){
  const [data,setData] = useState({});
  const[cid , setCid] = useState(0);
  const location = useLocation();
  const email = props.userEmail;
  const [childRendering,setChildRendering] = useState(false);
  useEffect(() => {
    Axios.get("http://localhost:3001/centre_info").then((response) => {
      setData(response.data);
    })
  },[]);
  useEffect(()=>{
    setChildRendering( location.pathname ===  `/vaccination/book_slots/${email}/centre_details/${cid}`);
    sessionStorage.setItem('childRendering', childRendering);
  },[location,email,cid,childRendering])

  const navigate = useNavigate();
  function Button(props){
    return <button className = 'bks-button'onClick={() => {
      setCid(props.value['row']['id']);
      navigate(`/vaccination/book_slots/${email}/centre_details/${props.value['row']['id']}`);
    }}>Expand</button>
  }
  const columns = [
    {field : 'Name_of_the_Location' , headerName : 'Location' , width:150 },
    {field : 'Vaccination_Centre' , headerName : 'Vaccination Center' , width : 200},
    {field : 'Address' , headerName : 'Address' , width : 350},
    {field : 'Slots_Available' , headerName :'Slots Available'  , filterable : false , width : 150},
    {field :'BookSlot' , headerName : 'Book Slot' , renderCell : (cellValues) => {
      return (<Button value = {cellValues} />)} ,disableClickEventBubbling: true, filterable : false , width : 150}, 
  ]
  return(
    <div>
      <div className={`vac-table-out ${childRendering?'blur':''}`}>
        <div className='vac-table' style={{width:'75%',margin:'40px 10px 10px 10px'}}>
          <DataGrid rows={data} columns={columns}
          initialState={{...data.initialState, pagination :{paginationModel :{pageSize :5}},}} pageSizeOptions={[5,10,25]}
          disableRowSelectionOnClick 
          disableColumnSelector   />
        </div>
      </div>
      <div id="detail" onRender = {()=> {setChildRendering(true)}}>
        <Outlet />
      </div>
    </div>
    
  )
}
function VacccinationTable(){
  const {mail} = useParams(); 
  return(
    <div>
      {/* <Header userEmail = {mail} /> */}
      <Table userEmail = {mail}/>
    </div>
  )

}

export default VacccinationTable;