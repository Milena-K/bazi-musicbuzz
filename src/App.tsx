import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './register';
import { Link, Router } from 'react-router-dom';

function App() {
    return <div className="App">
        <Link to="/register">register</Link>
        <Link to="/login">register</Link>
        <h1 className="text-6xl font-bold underline">
            Hello world!
        </h1>
    </div>
}

export default App;
