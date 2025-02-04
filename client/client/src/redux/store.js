// store.js
import { createStore, combineReducers } from 'redux';
import modalReducer from './reducers/modalReducer'; // Import your modal reducer

const rootReducer = combineReducers({
    modal: modalReducer
});

const store = createStore(
    rootReducer,
);

export default store;
