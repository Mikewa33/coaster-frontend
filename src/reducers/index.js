import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth';
import flashMsg from './flash';
import accountReducer from './account';
import parksReducer from './park';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  flash: flashMsg,
  account: accountReducer,
  park: parksReducer
});

export default rootReducer;
