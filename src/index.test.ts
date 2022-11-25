
import { pipe } from '@effect-ts/core/Function';
import * as T from '@effect-ts/core/Effect';
import { resolutionPlayerVsComputer } from './core/Logic';

test('player play shi and computer play shi', () => {
 pipe(
    T.gen( function* (_){
      const resolution = yield* _(resolutionPlayerVsComputer("shi", "shi"))
      expect(resolution).toMatch("equality")
      }
    ),
 T.runPromise
  )
});

test('player play fu and computer play shi', () => {
  pipe(
     T.gen( function* (_){
       const resolution = yield* _(resolutionPlayerVsComputer("fu", "shi"))
       expect(resolution).toMatch("lose")
       }
     ),
  T.runPromise
   )
 });

 test('player play mi and computer play shi', () => {
  pipe(
     T.gen( function* (_){
       const resolution = yield* _(resolutionPlayerVsComputer("mi", "shi"))
       expect(resolution).toMatch("win")
       }
     ),
  T.runPromise
   )
 });