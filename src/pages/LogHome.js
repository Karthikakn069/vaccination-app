import Home from "./Home";
import Header from "./Header";
import {useParams} from "react-router-dom";
function LogHome(){
  const {mail} = useParams();
  console.log(mail);
  return(
    <div>
      <Header userEmail = {mail} />
      <Home userEmail={mail}/>
    </div>
  )
}
export default LogHome;