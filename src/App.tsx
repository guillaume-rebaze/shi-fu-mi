import './App.css';
import * as T from "@effect-ts/core/Effect"
import { mylitePipeV2 } from './core/Logic';
import { mathRandomService, randomService } from './core/ServiceProvider';
import { pipe } from '@effect-ts/core';
function App() {

  const pp = (e: React.MouseEvent<HTMLDivElement>) =>  pipe(
    mylitePipeV2(e.currentTarget.id),
    T.provideService(mathRandomService) (randomService),
    T.runPromise
  )

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
