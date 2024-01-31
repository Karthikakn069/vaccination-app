import './App.css';
import {Outlet , useLocation , useParams} from 'react-router-dom';
import './css/header.css';
import Home from './pages/Home';
import { useState , useEffect } from 'react';
import Header from './pages/Header';


function App() {
  const [isOutletRendering , setIsOutletRendering] = useState(false);
  //const [userEmail , setUserEmail] = useState('');
  const {userEmail} = useParams();
  console.log(userEmail);


  const location = useLocation();
  useEffect(()=>{
    setIsOutletRendering(location.pathname !== '/')
  },[location])
  return (
    <div>
      <Header isBlurred = {isOutletRendering} mail = {userEmail} />
      <Home isBlurred = {isOutletRendering} />
      <div id = "detail">
        <Outlet onRender = { () => {setIsOutletRendering(true)}}/>
      </div>
    </div>
    
  );
}

export default App;
