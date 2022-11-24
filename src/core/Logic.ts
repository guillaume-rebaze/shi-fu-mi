import * as T from '@effect-ts/core/Effect';

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
  services: {
    setRound: (value: string) => T.UIO<void>;
    setPlayerScore: (value: number) => T.UIO<void>;
    setComputerScore: (value: number) => T.UIO<void>;
    playerScore: number,
    computerScore: number,
  }
) =>
  T.gen(
    function* (_) {

      if (player === computer) {
        yield* _(services.setRound(result.equality))
      }

      else if (player === shifumi.shi) {
        if (computer === shifumi.fu) {
          yield* _(services.setRound(result.win))
          yield* _(services.setPlayerScore(services.playerScore + 1))
        } else {
          yield* _(services.setRound(result.lose))
          yield* _(services.setComputerScore(services.computerScore + 1))
        }
      }

      else if (player === shifumi.fu)
        if (computer === shifumi.mi) {
          yield* _(services.setRound(result.win))
          yield* _(services.setPlayerScore(services.playerScore + 1))
        }
        else {
          yield* _(services.setRound(result.lose))
          yield* _(services.setComputerScore(services.computerScore + 1))
        }

      else {
        if (computer === shifumi.shi) {
          yield* _(services.setRound(result.win))
          yield* _(services.setPlayerScore(services.playerScore + 1))
        }
        else {
          yield* _(services.setRound(result.lose))
          yield* _(services.setComputerScore(services.computerScore + 1))
        }
      }

    }
  )
