import './App.css';
import { useNavigate } from 'react-router-dom';

function Info(){
  const History = useNavigate();

    return <>
    <div className='information'>
    <h1 style={{fontSize: '2rem'}} onClick={() => History('/')}>Typing Speed Test</h1>
        <div className='infoPoints'>
            <ul>
            <li>All the words are not actual english words they are random generated words</li>
            <li>We suggest you to select minimum 30 seconds timer</li>
            <li>You can check your typing speed after the timers up or ending the game in between</li>
            <li>The random text generated is only 1 paragraph and 5 sentences</li>
            </ul>
        </div>
    </div>
    </>
}
export default Info;