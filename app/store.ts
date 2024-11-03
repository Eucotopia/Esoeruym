import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import { setupListeners } from '@reduxjs/toolkit/query'

import authReducer from '@/feature/auth/authSlice'
import { authApi } from '@/feature/api/authApi'

// Define the persist configuration, which specifies how and what part of the Redux state should be persisted
const persistConfig = {
  key: 'root',
  storage: storage,
  // List of reducers that should not be persisted
  blacklist: [''],
}
// Adding middleware (logger in this case) to monitor actions in the Redux state
const middleware = [logger, authApi.middleware]

// Combine all reducers, combining different slices of state into one main rootReducer
const rootReducer = combineReducers({
  auth: authReducer, // The authentication reducer that manages auth state
  [authApi.reducerPath]: authApi.reducer,
})

// Apply the persistReducer function to enable persistence for the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create the Redux store, applying persistedReducer, devTools for non-production, and middleware
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // Disables the serializable state check for performance reasons
      serializableCheck: false,
    }).concat(middleware),
})

// Create a persistor object, which is responsible for persisting the Redux state
export const persistor = persistStore(store)

// Infer the RootState and AppDispatch types from the store itself for strong typing in TypeScript
export type RootState = ReturnType<typeof store.getState> // RootState represents the state structure of the entire store
export type AppDispatch = typeof store.dispatch // AppDispatch is the type of the dispatch function

// Optional: set up listeners for behaviors like refetching when the app regains focus or reconnects to the internet
setupListeners(store.dispatch)
