import {combineReducers} from 'redux';
import common from './Common';
import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
const reducers = combineReducers({common});
const middleware = [thunk];
const store = configureStore({reducer: reducers, middleware});

export default store;
