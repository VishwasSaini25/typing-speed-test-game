import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Info from './Info';
import { BrowserRouter as Router, Route, Link,Routes } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/info" element={<Info />} />
        </Routes>
    </Router>
);
