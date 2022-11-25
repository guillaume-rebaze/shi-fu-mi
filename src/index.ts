import { pipe } from '@effect-ts/core';
import * as T from '@effect-ts/core/Effect';

import { computerPlayAndResolve, resolutionPlayerVsComputer } from './core/Logic';
import { getRand, mathRandomService, randomService } from './core/ServiceProvider';

  const shiFuMi = (player: string , computerInput : string| null) => T.gen(
    function* (_) {
      const rand = yield* _(getRand)
      let computer =  ""
      if (computerInput === null )computer = yield* _( computerPlayAndResolve(rand))
      else computer =  computerInput
      
       pipe(
        resolutionPlayerVsComputer(player, computer),
        T.run
      )

    }
  )

 export  const pipeShiFuMi = (playerInput :string ,  computerInput : string| null) => pipe(
    shiFuMi(playerInput , computerInput),
    T.provideService(mathRandomService)(randomService),
    T.runPromise
  )

 