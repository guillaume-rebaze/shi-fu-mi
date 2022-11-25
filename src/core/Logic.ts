import * as T from '@effect-ts/core/Effect';
import { log } from './ServiceProvider';

export const shifumi = {
  shi: 'shi',
  fu: 'fu',
  mi: 'mi'
}

export interface Result {
  win: string,
  lose: string,
  equality: string
}

export const result: Result = {
  win: "win",
  lose: "lose",
  equality: "equality"
}

export const computerPlayAndResolve = (rand: number): T.UIO<string> => T.succeedWith(() => {
  const computerValue = rand > 0.7 ? shifumi.shi : rand > 0.3 ? shifumi.fu : shifumi.mi
  return computerValue
})

export const resolutionPlayerVsComputer = (
  player: string,
  computer: string,
) : T.Effect<unknown, never, string> =>
  T.gen(
    function* (_) {
      if (player === computer) {
        yield* _(log(result.equality))
        return result.equality
      }
      else if (player === shifumi.shi) {
        if (computer === shifumi.fu) {
          yield* _(log(result.win))
          return result.win
        } else {
          yield* _(log(result.lose))  
          return result.lose
        }
      }
      else if (player === shifumi.fu)
        if (computer === shifumi.mi) {
          yield* _(log(result.win))
          return result.win
        }
        else {
          yield* _(log(result.lose))
          return result.lose
        }
      else {
        if (computer === shifumi.shi) {
          yield* _(log(result.win))
          return result.win
        }
        else {
          yield* _(log(result.lose))
          return result.lose
        }
      }
    }
  )
