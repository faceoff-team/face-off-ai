import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

//Make http accessible throughout app.
export const http = require('axios');

http.defaults.headers.post['Content-Type'] = 'application/json';
 
http.defaults.baseURL = "https://ai.faceoff.cf";

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(...middleware),
));

export default store;
