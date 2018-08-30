import {
  FLASH,
  CLEAN_FLASH
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FLASH:
      return { ...state, flashMsg: action.payload };
    case CLEAN_FLASH:
   	  return { ...state, flashMsg: null}
  }

  return state;
}