
import * as T from "@effect-ts/core/Effect"
import { pipe } from "@effect-ts/core/Function"
import { type } from "os"
import React, { ReactHTMLElement } from "react"

const shifumi = {
  shi: 'shi',
  fu: 'fu',
  mi: 'mi'
}

interface Result {
  win: String,
  lose: String,
  equality: String
}
const result: Result = {
  win: "win",
  lose: "lose",
  equality: "equality"
}

const resolve = (player: String, computer: String): String => {
  if (player === computer) return result.equality
  else if (player === shifumi.shi) {
    return computer === shifumi.fu ? result.win : result.lose
  }
  else if (player === shifumi.fu) {
    return computer === shifumi.mi ? result.win : result.lose
  }
  else {
    return computer === shifumi.shi ? result.win : result.lose
  }
}

const computerPlayAndResolve = (player: String): String => {
  const rand = Math.random()
  const computerValue = rand > 0.7 ? shifumi.shi : rand > 0.3 ? shifumi.fu : shifumi.mi
  return resolve(player, computerValue)
}

export const mylitePipe = (e: React.MouseEvent<HTMLDivElement>) => pipe(
  T.succeed(e.currentTarget.id),
  T.chain((n) => {
    return T.succeed(computerPlayAndResolve(n))
  }),
  T.chain((n) => {
    return T.succeed(console.log(n))
  }),
  T.result,
  T.runPromise
)



export const myPipe = () => pipe(
  T.succeed(1),
  T.chain((n) => {
    return T.succeed(n + 1)
  }),
  T.chain((n) => {
    return T.succeed(n + 1)
  }),
  T.chain((n) => {
    return T.succeed(n + 1)
  }),
  T.tap((n) => {
    return T.fail(`(${n})`)
  }),
  T.catchAll(function handle(n) {
    return T.succeed(n)
  }),
  T.chain((n) => {
    return T.fail(`error: ${n}`)
  }),
  T.chain(() => T.succeed(0)),
  T.result,
  T.chain(T.done),
  T.runPromise
)