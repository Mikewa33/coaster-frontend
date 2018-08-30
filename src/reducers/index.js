import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth';
import flashMsg from './flash';
import accountReducer from './account';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  flash: flashMsg,
  account: accountReducer
});

export default rootReducer;
