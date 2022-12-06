// Wrapper around basic redux createStore fn
// does same job but setups defaults
// turns on dev tools, thunk, and dev checks that catch common mistakes 
import { configureStore } from "@reduxjs/toolkit"
import hangmanReducer from '../features/hangman/hangman-slice'
import { randomWordApiSlice } from "../features/random-word-api-slice/random-word-api-slice"

export const store = configureStore({
  reducer: { 
    hangman: hangmanReducer,
    [randomWordApiSlice.reducerPath]: randomWordApiSlice.reducer
  },
  middleware: (getDefaultMiddleWare) => {
    // augment default middleware
    return getDefaultMiddleWare().concat(randomWordApiSlice.middleware)
  }
})

// type based on the store itself
export type AppDispatch = typeof store.dispatch
// **ts magic that updates type to the match state of your store!
export type RootState = ReturnType<typeof store.getState>