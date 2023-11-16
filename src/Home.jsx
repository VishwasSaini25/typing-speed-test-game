import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

import './App.css';
import axios from 'axios';

function Home(props) {
  const History = useNavigate();
  const {state} = useLocation();
  const { username, password } = state;
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [customTimer, setCustomTimer] = useState('10');
  const [timeRemaining, setTimeRemaining] = useState(customTimer);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [appDisplay, setAppDisplay] = useState('flow-root');
  const [infoDisplay, setInfoDisplay] = useState('block');
  const [inputHistory, setInputHistory] = useState([]);
  const display = {
    display: appDisplay,
  };
  const inDisplay = {
    display: infoDisplay,
  }
  useEffect(() => {
    if (isGameStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeRemaining === 0) {
      setIsGameOver(true);
      setIsGameStarted(false);
      console.log(inputHistory);
      const totalTypedWords = inputHistory.join(" ").split(" ").filter(word => word !== '').length;

      if (totalTypedWords > 0) {
        const minutes = customTimer / 60; // Total time allowed in minutes
        const wordsPerMinute = Math.round(totalTypedWords / minutes);
        setTypingSpeed(wordsPerMinute);
      } else {
        // No words were typed, set typing speed to zero
        setTypingSpeed(0);
      }
    }
  }, [isGameStarted, timeRemaining]);

  useEffect(() => {
    if (isGameStarted) {
      generateRandomText(false);
    }
  }, [isGameStarted]);

  const generateRandomText = async (play) => {
    try {
      const response = await fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1&sentences=1');
      const data = await response.json();
      // console.log(data);
      setText(data[0]);
      if (play) {
        setHighlightedIndex(0);
        setUserInput('');
        return;
      } else {
        setHighlightedIndex(0);
        setUserInput('');
        setInputHistory([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setUserInput(value);

    const typedWords = value.split(' ');
    const currentWord = text.split(' ')[highlightedIndex];

    let allWordsCorrect = true;

    for (let i = 0; i < typedWords.length; i++) {
      if (typedWords[i] !== text.split(' ')[i]) {
        allWordsCorrect = false;
        break;
      }
    }

    if (allWordsCorrect && typedWords.length === text.split(' ').length) {
      // User has typed all the words correctly, fetch a new text
      setInputHistory((prevHistory) => [...prevHistory, value]);
      generateRandomText(allWordsCorrect);
    } else if (typedWords[highlightedIndex] === currentWord && highlightedIndex < text.split(' ').length - 1) {
      setHighlightedIndex((prevIndex) => prevIndex + 1);
    }
  };


  const startGame = () => {
    setInfoDisplay('none');
    setAppDisplay('flex');
    setIsGameStarted(true);
    setIsGameOver(false);
    setTimeRemaining(customTimer);
    setUserInput('');
  };

  const endGame = () => {
    setIsGameOver(true);
    setIsGameStarted(false);

    const totalTypedWords = inputHistory.join(" ").split(" ").filter(word => word !== '').length;

    if (totalTypedWords > 0) {
      const minutes = (customTimer - timeRemaining) / 60; // Total time allowed in minutes
      const wordsPerMinute = Math.round(totalTypedWords / minutes);
      setTypingSpeed(wordsPerMinute);
    } else {
      // No words were typed, set typing speed to zero
      setTypingSpeed(0);
    }
  };
  const playAgain = () => {
    setUserInput('');
    window.location.reload(false);
  };
  const handleLogout = async () => {
    await axios.post('http://localhost:5000/api/logout', { username, password })
        .then(response => {
            console.log(response.data);
            props.func(null);
            if(response.data){
                History("/");
            }else {
            History(null);
            }
        })
        .catch(error => {
            alert(error.response.data.error);
        });
}

  return (
    <div className="App" style={display}>
      <div className='info' style={inDisplay} onClick={() => History('/info')}>
        <h2>i</h2>
        <button onClick={handleLogout}>Logout</button>

      </div>
      <div className="game-container">
        <h1>Typing Speed Test</h1>
        {!isGameStarted && !isGameOver && <>
          <div className="timer-input">
            <label>Set Timer (in seconds):</label>
            <input
              type="number"
              value={customTimer}
              onChange={(e) => setCustomTimer(e.target.value)}
              min="10"
              autoFocus
              required
            />
          </div>
          <button className="button-36" onClick={startGame}>Start Game</button>
        </>
        }
        {isGameStarted && !isGameOver && (
          <div>
            <p className={timeRemaining < 10 ? 'blinking' : ''}>Time Remaining: {timeRemaining} seconds</p>
            <p className="text-display">
              {text.split(' ').map((word, index) => (
                <span
                  key={index}
                  className={highlightedIndex === index ? 'highlighted' : ''}
                >
                  {word}{' '}
                </span>
              ))}
            </p>
            <input
              type="text"
              placeholder="Start typing..."
              value={userInput}
              onChange={handleInputChange}
              onPaste={(e) => e.preventDefault()}
              autoFocus
            />
            <button className="button-36" onClick={endGame}>End Game</button>
          </div>
        )}
        {isGameOver && (
          <div>
            <p>Game Over!</p>
            <p>Your Speed: {typingSpeed} wpm</p>
            <button className="button-36" onClick={playAgain}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
