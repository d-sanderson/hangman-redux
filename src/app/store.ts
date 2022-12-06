// Wrapper around basic redux createStore fn
// does same job but setups defaults
// turns on dev tools, thunk, and dev checks that catch common mistakes 
import { configureStore } from "@reduxjs/toolkit"
import counterReducer from '../features/counter/counter-slice'
import hangmanReducer from '../features/hangman/hangman-slice'
import { dogsApiSlice } from "../features/dogs/dogs-api-slice"
import { randomWordApiSlice } from "../features/random-word-api-slice/random-word-api-slice"

export const store = configureStore({
  reducer: { 
    counter: counterReducer,
    hangman: hangmanReducer,
    [dogsApiSlice.reducerPath]: dogsApiSlice.reducer,
    [randomWordApiSlice.reducerPath]: randomWordApiSlice.reducer
  },
  middleware: (getDefaultMiddleWare) => {
    // augment default middleware
    return getDefaultMiddleWare().concat(dogsApiSlice.middleware, randomWordApiSlice.middleware)
  }
})

// type based on the store itself
export type AppDispatch = typeof store.dispatch
// **ts magic that updates type to the match state of your store!
export type RootState = ReturnType<typeof store.getState>