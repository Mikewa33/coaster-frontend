import {
    PARKS_GET,
    PARK_GET
} from '../actions/types';


let initalState = {parks: [], coasters: [], current_park: {}}
export default function(state = initalState, action) {
    switch(action.type) {

    case PARKS_GET:
        return { ...state, error: '', parks: action.payload.parks, coasters: action.payload.coasters };
    case PARK_GET:
        return {...state, error: '', current_park: action.payload}
    }
    return state;
  }