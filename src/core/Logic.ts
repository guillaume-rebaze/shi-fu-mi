
import * as T from "@effect-ts/core/Effect"
import { pipe } from "@effect-ts/core/Function"
import { tag } from "@effect-ts/core/Has"
import { type } from "os"
import React, { ReactHTMLElement } from "react"

interface Service {
  getTime: T.UIO<Date>
}
const myServiceTag = tag<Service>()
const getTime = T.accessServiceM(myServiceTag)(s => s.getTime)
const liveService = myServiceTag.of({ getTime: T.succeedWith(() => new Date()) })

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

const resolve = (player: string, computer: string): string => {
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

const computerPlayAndResolve = (adapter: T.Adapter, rand : T.UIO<number> , player: string): T.UIO<string> => T.succeedWith(() => {
  const a = adapter(()=>{return rand})
// testing

  const computerValue = rand > 0.7 ? shifumi.shi : rand > 0.3 ? shifumi.fu : shifumi.mi
  return resolve(player, computerValue)
}
)

export const mylitePipe = (e: React.MouseEvent<HTMLDivElement>) => pipe(
  T.succeed(e.currentTarget.id),
  T.map((n) => {
    return computerPlayAndResolve(n)
  }),
  T.chain((n) => {
    return T.succeed(console.log(n))
  }),
)

interface MathRandomService {
  getRand: T.UIO<number>
}
const mathRandomService = tag<MathRandomService>()
const getRand = T.accessServiceM(mathRandomService)(s => s.getRand)
const randomService = mathRandomService.of({ getRand: T.succeedWith(() => Math.random()) })


interface ConsoleService {
  log: (message: string) => T.UIO<void>
}
const consoleService = tag<ConsoleService>()
const log = (s: string) => T.succeedWith(() => { console.log(s) })

export const mylitePipeV2 = (e: React.MouseEvent<HTMLDivElement>) => T.gen(
  function* (_) {
    const x = yield* _(computerPlayAndResolve(_, randomService.getRand, e.currentTarget.id))
    yield* _(log(x))
    yield* _(randomService.getRand)
  }
)

export const myPipe = () => pipe(
  getTime,
  T.map(d => d.getTime()),
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
  T.provideService(myServiceTag)(liveService),
  T.runPromise
)