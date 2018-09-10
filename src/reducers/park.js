import {
    PARKS_GET,
} from '../actions/types';


let initalState = {parks: [], coasters: []}
export default function(state = initalState, action) {
    switch(action.type) {

    case PARKS_GET:
        return { ...state, error: '', parks: action.payload.parks, coasters: action.payload.coasters };
    }
    return state;
  }