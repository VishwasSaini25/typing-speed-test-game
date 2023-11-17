import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate} from 'react-router-dom';
import { Input,InputGroup,InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/react";


function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ show,setShow ] = useState(false);

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
                if(response.data){
                    document.cookie = `token=${response.data.token}`;
                    History("/home",{ state: {username: response.data.user.username, password: response.data.user.password}});
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
                    <InputGroup size="md">
                    <input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width='4.5rem' marginRight="2%">
                         <Button className='showPass' bg="white" h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            {show ? 'Hide' : 'Show'}
                         </Button>
                     </InputRightElement>
                    </InputGroup>
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
