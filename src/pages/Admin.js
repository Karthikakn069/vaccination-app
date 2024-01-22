import React from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header";
function Admin(){
  return(
    <div>
      <Header userEmail = {'admin'} />
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}
export default Admin;
