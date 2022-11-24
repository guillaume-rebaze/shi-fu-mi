import './App.css';

import { pipe } from '@effect-ts/core';
import * as T from '@effect-ts/core/Effect';
import { useState } from 'react';

import { computerPlayAndResolve, result, shifumi } from './core/Logic';
import { getRand, mathRandomService, randomService } from './core/ServiceProvider';

function App() {

  const [playerScore , setPlayerScoreState] = useState<number>(0)
  const [roundResult , setRoundResult] = useState<string>("")
  const [computerScore , setComputerScoreState] = useState<number>(0) 

  const setRound = (value: string) => T.succeedWith(() => {setRoundResult(value)})
  const setPlayerScore = (value: number) => T.succeedWith(() => {setPlayerScoreState(value)})
  const setComputerScore = (value: number) => T.succeedWith(() => {setComputerScoreState(value)})



  const mylitePipeV2 = (player:string) => T.gen(
    function* (_) {
      const rand = yield* _(getRand)
      const computer = yield* _(computerPlayAndResolve( rand, player))
  
      if (player === computer){ 
          yield* _(setRound(result.equality))
      }
     
      else if (player === shifumi.shi){
      if(  computer === shifumi.fu )  {
         yield* _(setRound(result.win))
         yield* _(setPlayerScore(playerScore + 1))
        } else {
          yield* _(setRound(result.lose))
          yield* _(setComputerScore(computerScore + 1))
        }}
      
      else if (player === shifumi.fu) 
      if( computer === shifumi.mi ) {
        yield* _(setRound(result.win))
        yield* _(setPlayerScore(playerScore + 1))
      }
       else{ 
        yield* _(setRound(result.lose))
        yield* _(setComputerScore(computerScore + 1))
      }
      
      else {
      if(computer === shifumi.shi)  {
         yield* _(setRound(result.win))
         yield* _(setPlayerScore(playerScore + 1))
        }
       else{
         yield* _(setRound(result.lose))
         yield* _(setComputerScore(computerScore + 1))
        }
      }
      
    }
  )

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
          <div className="score">player score : {playerScore} </div>
        </div>
        <div>{roundResult}</div>
        <div className="buttons-player">
          <div className="button button-shi">shi</div>
          <div className="button button-fu">fu</div>
          <div className="button button-mi">mi</div>
          <div className="score">computer score : {computerScore} </div>
        </div>
      </div>
    </div>
  );
}

export default App;
