import React, { useEffect } from 'react';
import './App.css';
import Login from './Login';
import Info from './Info';
import Home from './Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
function App() {
  const history = useNavigate();

  // check cookie available or not
  useEffect(() => {
    if (document.cookie) {
      history("./home");
    } else {
      history("/");
    } 
  }, []);


  return <>
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/home" exact element=
        {<Home />} />
      <Route path="/info" exact element=
        {<Info />} />
    </Routes>
    {/* <Routes  Location={location} key={location.pathname}>
        <Route path="/" exact element={<Login func = {setLoginUser} />} />
        <Route path="/home" exact element=
        {  user && user.user && user.user._id ? <Home user ={user} func = {setLoginUser} /> : <Login func = {setLoginUser}/> }  />
        <Route path="/info" exact  element=
        {  user && user.user && user.user._id ? <Info user ={user} func = {setLoginUser} /> : <Login func = {setLoginUser}/> }  />
        </Routes> */}
  </>
}
export default App;