import { expect } from '../test_helper';
import accountReducer from '../../src/reducers/account';
import {
    ACCOUNT_INFO,
    ACCOUNT_ERROR
  } from '../../src/actions/types';

  describe('Account Reducer', () => {
    it('handles action with unknown type', () => {
        expect(accountReducer(undefined, {})).to.eql({});
    });

    it('handles action of type ACCOUNT_INFO', () => {
        const action = { type: ACCOUNT_INFO, payload: "test123@gmail.com" };
        expect(accountReducer([], action)).to.eql({ email: "test123@gmail.com", error: '' } );
    });

    it('handles action of type ACCOUNT_ERROR', () => {
        const action = { type: ACCOUNT_ERROR, payload: "password wrong" };
        expect(accountReducer([], action)).to.eql({ error: "password wrong" } );
    });
});