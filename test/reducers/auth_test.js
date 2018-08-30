import { expect } from '../test_helper';
import authReducer from '../../src/reducers/auth';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  AUTH_EMAIL_SENT,
  AUTH_ERROR_CLEAR
} from '../../src/actions/types';

describe('Auth Reducer', () => {
  it('handles action with unknown type', () => {
    expect(authReducer(undefined, {})).to.eql({});
  });

  it('handles action of type AUTH_USER', () => {
    const action = { type: AUTH_USER };
    expect(authReducer([], action)).to.eql({ error: '', authenticated: true } );
  });

  it('handles action of type UNAUTH_USER', () => {
    const action = { type: UNAUTH_USER };
    expect(authReducer([], action)).to.eql({ authenticated: false } );
  });

  it('handles action of type AUTH_ERROR', () => {
    const action = { type: AUTH_ERROR , payload: "Error"};
    expect(authReducer([], action)).to.eql({ error: "Error" } );
  });

  it('handles action of type AUTH_EMAIL_SENT', () => {
    const action = { type: AUTH_EMAIL_SENT , payload: "Email Sent"};
    expect(authReducer([], action)).to.eql({ error: '',emailSent:"Email Sent" } );
  });

  it('handles action of type ERROR_CLEAR', () => {
    const action = { type: AUTH_ERROR_CLEAR };
    expect(authReducer([], action)).to.eql({ error: '',emailSent:null } );
  });

  it('handles action of type FETCH_MESSAGE', () => {
    const action = { type: FETCH_MESSAGE, payload: "Payload" };
    expect(authReducer([], action)).to.eql({ message: "Payload" } );
  });
});