import { expect } from '../test_helper';
import flashReducer from '../../src/reducers/flash';
import {
  FLASH,
  CLEAN_FLASH
} from '../../src/actions/types'

describe('Flash Reducer', () => {
  it('handles action with unknown type', () => {
    expect(flashReducer(undefined, {})).to.eql({});
  });

  it('handles action of type FLASH', () => {
    const action = { type: FLASH, payload: "test flash" };
    expect(flashReducer([], action)).to.eql({ flashMsg: "test flash" } );
  });

  it('handles action of type CLEAN_FLASH', () => {
    const action = { type: CLEAN_FLASH };
    expect(flashReducer([], action)).to.eql({ flashMsg: null } );
  });

});