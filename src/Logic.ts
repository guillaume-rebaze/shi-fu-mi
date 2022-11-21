import * as T from "@effect-ts/core/Effect"
import { pipe } from "@effect-ts/core/Function"
import { tag } from "@effect-ts/core/Has"


interface ConsoleService {
    log: (message: string) => T.Effect<unknown, never, void>;
}

interface RandomService {
    rand: T.Effect<unknown, never, number>
}

const consoleService = tag<ConsoleService>()
const randomService = tag<RandomService>()

const log = (message: string) => T.accessService(consoleService)((_) => _.log(message))
const rand = T.accessServiceM(randomService)((_) => _.rand)

export function logResult(name: string) {
    return log(`result : ${name}`)
}


class BadRandomValue {
    readonly _tag = "BadRandomValue"
    constructor(readonly n: number) { }
}

const program = T.gen(function* (_) {

    const value = yield* _(rand)

    if (value > 0.5) {
        yield* _(T.fail(new BadRandomValue(value)))
    } else {
        yield* _(log(`got : ${value}`))
    }

})


export const pp = () => pipe(
    program,
    T.provideService(consoleService)({
        log: (message) => T.effectAsync(() => {
            console.log(message)
        })
    }),
    T.provideService(randomService)({
        rand: T.(() => {
            return Math.random()
        })
    }),
    T.runPromise
)