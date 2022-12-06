import { useEffect } from 'react';
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks';
import SplineScene from './components/SplineScene';
import { checkLost, checkWin, reset, setError, setWord, validateGuess } from './features/hangman/hangman-slice';
import { useLazyFetchWordQuery } from './features/random-word-api-slice/random-word-api-slice';

function App() {

  const [trigger, { isLoading, isError, isSuccess, data, error }] = useLazyFetchWordQuery()
  const hangman = useAppSelector((state) => state.hangman)
  const dispatch = useAppDispatch();


  // initial load
  useEffect(() => {
    const handleInput = (e: KeyboardEvent) => dispatch(validateGuess(e.key))
    document.addEventListener('keydown', handleInput)
    trigger()
  }, [])

  // reset - load new word 
  useEffect(() => {
    if (isSuccess && data) {
      const [word] = data
      dispatch(setWord(String(word)))
    }
  }, [isSuccess, data])

  // failure
  useEffect(() => {
    if (isError && error) {
      dispatch(setError(Number(error)))
    }
  }, [isError])

  // win
  useEffect(() => {
    if(hangman.gameState === 'active') {
      dispatch(checkWin())
    }
  }, [hangman.guessedLetters.correct])

  // lose
  useEffect(() => {
    if (hangman.triesRemaining === 0) {
      dispatch(checkLost())
    }
  }, [hangman.triesRemaining])

  return (
    <div>
      <SplineScene />
      <pre>
      {JSON.stringify(hangman, null, 2)}
      </pre>
      {hangman.gameState === 'lose' &&
        <p>the correct word was <strong>{hangman.word}</strong>.</p>
      }
      {/* <input type="text" onKeyDown={(e) => dispatch(validateGuess(e.key))} /> */}
      <button onClick={() => {
        dispatch(reset())
        trigger()
      }}>reset</button>
    </div>
  )
}

export default App
