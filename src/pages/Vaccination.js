import React from "react";
import Header from "./Header";
import {useParams,Outlet} from "react-router-dom";
import VaccinationTable from "./VaccinationTable";
import UserSlots from "./UserSlots";
function Vaccination(){
  const {display,mail} = useParams();
  return(
    <div>
      <Header userEmail = {mail}  />
      <div id ="detail">
        <Outlet />
      </div>
    </div> 
  )
}
export default Vaccination;