import * as T from "@effect-ts/core/Effect"
import { tag } from "@effect-ts/core/Has"

/* random service */
 interface MathRandomService {
    getRand: T.UIO<number>
  }

  export const mathRandomService = tag<MathRandomService>()
  export const getRand = T.accessServiceM(mathRandomService)(s => s.getRand)
  export const randomService = mathRandomService.of({ getRand: T.succeedWith(() => Math.random()) })
  
  
/*console service*/
  interface ConsoleService {
    log: (message: string) => T.UIO<void>
  }
  export const consoleService = tag<ConsoleService>()
  export const log = (s: string) => T.succeedWith(() => { console.log(s) })
  
  /*test service */

 