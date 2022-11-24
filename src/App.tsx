import './App.css';

import { pipe } from '@effect-ts/core';
import * as T from '@effect-ts/core/Effect';
import { HtmlHTMLAttributes, useRef, useState } from 'react';

import { computerPlayAndResolve, resolutionPlayerVsComputer } from './core/Logic';
import { getRand, mathRandomService, randomService } from './core/ServiceProvider';

function App() {

  const [playerScore, setPlayerScoreState] = useState<number>(0)
  const [roundResult, setRoundResult] = useState<string>("")
  const [computerScore, setComputerScoreState] = useState<number>(0)

  const shiRef = useRef<HTMLDivElement>(null)
  const fuRef = useRef<HTMLDivElement>(null)
  const miRef = useRef<HTMLDivElement>(null)

  const setRound = (value: string) => T.succeedWith(() => { setRoundResult(value) })
  const setPlayerScore = (value: number) => T.succeedWith(() => { setPlayerScoreState(value) })
  const setComputerScore = (value: number) => T.succeedWith(() => { setComputerScoreState(value) })

  const services = {
    setRound: setRound,
    setPlayerScore: setPlayerScore,
    setComputerScore: setComputerScore,
    playerScore,
    computerScore,
  }

  const shiFuMi = (player: string) => T.gen(
    function* (_) {
      const rand = yield* _(getRand)
      const computer = yield* _(computerPlayAndResolve(rand))
      
      shiRef.current?.classList.remove("brightness")
      fuRef.current?.classList.remove("brightness")
      miRef.current?.classList.remove("brightness")

      if(computer === "shi"){
        shiRef.current?.classList.add("brightness")
      }
      else if(computer === "fu"){
        fuRef.current?.classList.add("brightness")
      }
      else{
        miRef.current?.classList.add("brightness")
      }

      pipe(
        resolutionPlayerVsComputer(player, computer, services),
        T.run
      )

    }
  )

  const pipeShiFuMi = (e: React.MouseEvent<HTMLDivElement>) => pipe(
    shiFuMi(e.currentTarget.id),
    T.provideService(mathRandomService)(randomService),
    T.runPromise
  )

  return (
    <div className="App">
      <div className="buttons-container">
        <div className="buttons-player">
          <div className="button player button-shi" onClick={pipeShiFuMi} id='shi' >shi</div>
          <div className="button player button-fu" onClick={pipeShiFuMi} id='fu' >fu</div>
          <div className="button player button-mi" onClick={pipeShiFuMi} id='mi' >mi</div>
          <div className="score">player score : {playerScore} </div>
        </div>
        <div>{roundResult}</div>
        <div className="buttons-player">
          <div className="button button-shi" ref={shiRef} >shi</div>
          <div className="button button-fu" ref={fuRef} >fu</div>
          <div className="button button-mi" ref={miRef} >mi</div>
          <div className="score">computer score : {computerScore} </div>
        </div>
      </div>
    </div>
  );
}

export default App;
