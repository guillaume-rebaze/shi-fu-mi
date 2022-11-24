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

export const computerPlayAndResolve = ( rand : number , player: string): T.UIO<string> => T.succeedWith(() => {
  const computerValue = rand > 0.7 ? shifumi.shi : rand > 0.3 ? shifumi.fu : shifumi.mi
  return computerValue
})




