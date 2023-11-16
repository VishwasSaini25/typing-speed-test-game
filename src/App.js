import React,{useState,useEffect} from 'react';
import './App.css';
import Login from './Login';
import Info from './Info';
import Home from './Home';
import {Route,Routes,useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
function App (){
    const location = useLocation();
    const [user,setLoginUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState();
    const history = useNavigate();
    // console.log(user);
    // console.log(user.user._id);
    useEffect(() => {
      const checkLoggedInStatus = async () => {
          await axios.get('http://localhost:5000/api/check-login-status')
          .then(response => {
            setLoggedIn(response.data.loggedIn);
          })
        .catch(error => {
          console.error(error);
        });
      }
      checkLoggedInStatus();
    }, []); // Run once on component mount
    
    useEffect(() => {
      if (loggedIn) {
        history('/home');
      }
    }, [loggedIn, history]);

    return <>
        <Routes  Location={location} key={location.pathname}>
        <Route path="/" exact element={<Login func = {setLoginUser} />} />
        <Route path="/home" exact element=
        {  user && user.user && user.user._id ? <Home user ={user} func = {setLoginUser} /> : <Login func = {setLoginUser}/> }  />
        <Route path="/info" exact  element=
        {  user && user.user && user.user._id ? <Info user ={user} func = {setLoginUser} /> : <Login func = {setLoginUser}/> }  />
        </Routes>
    </>
}
export default App;