import './App.css';
import { pp } from './core/Logic';
import { testresultEither } from './core/max/ts_zio_test';

function App() {

  console.log(testresultEither)

  return (
    <div className="App">
      <div className="buttons-container">
        <div className="buttons-player">
          <div className="button player button-shi" onClick={pp} id='shi' >shi</div>
          <div className="button player  button-fu" onClick={pp} id='fu' >fu</div>
          <div className="button player  button-mi" onClick={pp} id='mi' >mi</div>
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
