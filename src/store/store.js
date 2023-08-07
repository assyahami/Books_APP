import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import userReducer from './user/userReducer'
import bookReducer from './book/bookReducer'
import storage from 'redux-persist/lib/storage';
const rootReducers = combineReducers({ userReducer, bookReducer })

const createAppStore = createStore(rootReducers, applyMiddleware(thunk))


export default createAppStore


