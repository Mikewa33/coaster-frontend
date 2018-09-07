import {
    PARKS_GET,
} from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {

    case PARKS_GET:
        return { ...state, error: '', parks: action.payload };
    }
    return state;
  }