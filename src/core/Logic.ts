
import * as T from "@effect-ts/core/Effect"
import { pipe } from "@effect-ts/core/Function"
import { tag } from "@effect-ts/core/Has"
import { type } from "os"
import React, { ReactHTMLElement } from "react"
import { log, randomService } from "./ServiceProvider"

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

export const mylitePipeV2 = (e: React.MouseEvent<HTMLDivElement>) => T.gen(
  function* (_) {

    const rand = yield* _(randomService.getRand)
    const player = e.currentTarget.id
    const computer = yield* _(computerPlayAndResolve( rand, e.currentTarget.id))

    if (player === computer) yield* _(T.succeed(log(result.equality)))
   
    else if (player === shifumi.shi) yield* _(T.succeed( computer === shifumi.fu ? log(result.win) : log(result.lose)))
    
    else if (player === shifumi.fu) yield* _(T.succeed( computer === shifumi.mi ? log(result.win) : log(result.lose)))
    
    else  yield* _(T.succeed(computer === shifumi.shi ? log(result.win) : log(result.lose)))
    
  }
)

