import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers/RootReducer'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore } from 'redux-persist'

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk)),
)

export const persistor = persistStore(store)

store.subscribe(() => {
  console.log('dispatch', store.getState())
})
