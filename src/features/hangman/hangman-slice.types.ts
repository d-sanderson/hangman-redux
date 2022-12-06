export interface HangmanState {
  gameState: 'inactive' | 'active' | 'win' | 'lose' | 'failure'
  triesRemaining: number,
  word: string | null,
  error: null | number,
  guessedLetters: {
    correct: string,
    incorrect: string
  }
}