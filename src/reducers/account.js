import {
    ACCOUNT_INFO,
    ACCOUNT_ERROR
} from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {

    case ACCOUNT_INFO:
        return { ...state, error: '', email: action.payload };
    case ACCOUNT_ERROR:
        return { ...state, error: action.payload };

    }
    return state;
  }
  