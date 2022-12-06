import { useEffect } from 'react';
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks';
import { checkLost, checkWin, reset, setError, setWord, validateGuess } from './features/hangman/hangman-slice';
import { useLazyFetchWordQuery } from './features/random-word-api-slice/random-word-api-slice';

function App() {

  const [trigger, { isLoading, isError, isSuccess, data, error: lazyError }] = useLazyFetchWordQuery()
  const hangman = useAppSelector(state => state.hangman)
  const dispatch = useAppDispatch();

  // initial load
  useEffect(() => {
    trigger()
  }, [])

  // reset - load new word 
  useEffect(() => {
    if (isSuccess && data) {
      const [word] = data
      dispatch(setWord(word))
    }
  }, [isSuccess, data])

  // failure
  useEffect(() => {
    if (isError) {
      dispatch(setError(error.status))
    }
  }, [isError])

  // win
  useEffect(() => {
    dispatch(checkWin())
  }, [hangman.guessedLetters.correct])

  // lose
  useEffect(() => {
    if (hangman.triesRemaining === 0) {
      dispatch(checkLost())
    }
  }, [hangman.triesRemaining])
  
  return (
    <div className="App">
      <pre>
      {JSON.stringify(hangman, null, 2)}
      </pre>
      {hangman.gameState === 'lose' &&
        <p>the correct word was <strong>{hangman.word}</strong>.</p>
      }
      <input type="text" onKeyDown={(e) => dispatch(validateGuess(e.key))} />
      <button onClick={() => {
        dispatch(reset())
        trigger()
      }}>reset</button>
    </div>
  )
}

export default App
