import React, { useEffect } from 'react';
import './App.css';
import { mylitePipeV2 } from './core/Logic';
import { randListPerson } from './core/max/ts_prog';

function App() {

  const persons = randListPerson(5)

  return (
    <div className="App">
      <div className="buttons-container">
        <div className="buttons-player">
          <div className="button player button-shi" onClick={mylitePipeV2} id='shi' >shi</div>
          <div className="button player  button-fu" onClick={mylitePipeV2} id='fu' >fu</div>
          <div className="button player  button-mi" onClick={mylitePipeV2} id='mi' >mi</div>
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
