import * as T from "@effect-ts/core/Effect"
import * as Either from "@effect-ts/core/Either"
import { left, right, Right } from "@effect-ts/core/Either"

const effectSucceed = T.succeed(42, "trace")
const effectFail = T.fail("error", "trace")
const rioEither = T.either(effectSucceed)
const effectEither = T.fromEither(() => new Right(42))

const minLenght = (s: string): Either.Either<string, string> =>
    s.length >= 6 ? right(s) : left('at least 6 characters')

const absLenght1 = minLenght("coucou")
const absLenght2 = minLenght("cou")
export const testresultEither = absLenght1 + "_" + absLenght2

const minLenght3 = (s: string): T.Effect<unknown, never, string> | T.IO<string, never> =>
    s.length >= 6 ? T.succeed(s) : T.fail('at least 6 characters')

const a = true
const aa = (k:number) => {
    const z = 12
    return z + k
}
const b = a ? aa(2) : undefined

const test111 = 111

