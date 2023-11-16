import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate} from 'react-router-dom';


function Login(props) {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const History = useNavigate();
    const handleRegister = async () => {
        await axios.post('http://localhost:5000/api/register', { username, password })
            .then(response => {
                console.log(response.data);
                if(response.data){
                    alert("Success, You must login now");
                    History("/",{ state: {username: response.data.username, password: response.data.password}});
                }else {
                History("/");
                }
            })
            .catch(error => {
                alert(error.response.data);
            });
    }
    const handleLogin = async () => {
        await axios.post('http://localhost:5000/api/login', { username, password })
            .then(response => {
                console.log(response.data);
                props.func(response.data);
                if(response.data){
                    History("/home",{ state: {username: response.data.username, password: response.data.password}});
                }else {
                History("/");
                }
            })
            .catch(error => {
                alert(error.response.data);
            });
    }

    return (
        <div className='log-form'>
            <div className="container">
                <h2>Typing Speed Test</h2>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button onClick={handleRegister}>Register</button>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
