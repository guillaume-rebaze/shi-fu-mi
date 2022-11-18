import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">

      <div className="buttons-container">
        <div className="buttons-player">
          <div className="button player button-shi">shi</div>
          <div className="button player  button-fu">fu</div>
          <div className="button player  button-mi">mi</div>
          <div className="score">player score : </div>
        </div>
        <div className="buttons-player">
          <div className="button button-shi">shi</div>
          <div className="button button-fu">fu</div>
          <div className="button button-mi">mi</div>
          <div className="score">computer score : </div>
        </div>
      </div>

    </div>
  );
}

export default App;
