import './App.css';
import React from 'react';

function App() {
  
  return (   
    <div className="wrapper">
      <button id="start">Start</button>
      <button id="stop">Stop</button>
      <div id="clock">
        <span id="hour"></span>:<span id="minutes"></span>:<span id="seconds"></span>
      </div>
      <button id="reset">Reset</button>
      <button id="wait">Wait</button>
    </div>

  );
}

export default App;
