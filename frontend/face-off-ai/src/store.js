import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';

//Make http accessable throughout app.
export const http = require('axios');

http.defaults.headers.post['Content-Type'] = 'application/json';
 
const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;