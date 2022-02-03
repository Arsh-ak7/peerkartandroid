import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';

const reducers = combineReducers({
  auth: authReducer,
});

const middleware = [thunk];

const store = createStore(reducers, applyMiddleware(...middleware));
export default store;
