import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './register';
import { Link, Router } from 'react-router-dom';

function App() {
    return <div className="App h-screen flex items-center bg-black text-white">
        <h1 className="text-2xl text-center w-full">
            Welcome to MusicBuzz, please
            <Link to="/login">
                <span className="text-purple-300"> login </span>
            </Link>
            or
            <Link to="/register">
                <span className="text-purple-300"> register </span> to enter the app.
            </Link>
        </h1>
    </div>
}

export default App;
