import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR_CLEAR,
  FETCH_MESSAGE,
  AUTH_EMAIL_SENT,
  AUTH_ERROR
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {

    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case AUTH_EMAIL_SENT:
      return { ...state, error: '',emailSent: action.payload };
    case AUTH_ERROR_CLEAR:
      return { ...state, error: '', emailSent: null};
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
  }

  return state;
}
