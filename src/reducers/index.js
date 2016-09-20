import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import profileReducer from './profile_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  profiles: profileReducer
});

export default rootReducer;
