// reducer.js
import { SHOW_MODAL, HIDE_MODAL } from '../actions/modalActions';

const initialState = {
    isVisible: false,
    content: null
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                isVisible: true,
                content: action.payload
            };
        case HIDE_MODAL:
            return {
                ...state,
                isVisible: false,
                content: null
            };
        default:
            return state;
    }
};

export default modalReducer;
