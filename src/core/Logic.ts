
import * as T from "@effect-ts/core/Effect"
import { pipe } from "@effect-ts/core/Function"
import React, { ReactHTMLElement } from "react"
import { consoleService, getRand, log, mathRandomService, randomService } from "./ServiceProvider"

const shifumi = {
  shi: 'shi',
  fu: 'fu',
  mi: 'mi'
}

interface Result {
  win: string,
  lose: string,
  equality: string
}

const result: Result = {
  win: "win",
  lose: "lose",
  equality: "equality"
}

const computerPlayAndResolve = ( rand : number , player: string): T.UIO<string> => T.succeedWith(() => {
  const computerValue = rand > 0.7 ? shifumi.shi : rand > 0.3 ? shifumi.fu : shifumi.mi
  return computerValue
})

export const mylitePipeV2 = (player:string) => T.gen(
  function* (_) {
  
    const rand = yield* _(getRand)
    const computer = yield* _(computerPlayAndResolve( rand, player))

    if (player === computer) yield* _(log(result.equality))
   
    else if (player === shifumi.shi) yield* _( computer === shifumi.fu ? log(result.win) : log(result.lose))
    
    else if (player === shifumi.fu) yield* _( computer === shifumi.mi ? log(result.win) : log(result.lose))
    
    else  yield* _(computer === shifumi.shi ? log(result.win) : log(result.lose))
    
  }
)

export const pp = (e: React.MouseEvent<HTMLDivElement>) =>  pipe(
  mylitePipeV2(e.currentTarget.id),
  T.provideService(mathRandomService) (randomService),
  T.runPromise
)
