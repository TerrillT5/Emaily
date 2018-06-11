import { combineReducers } from 'redux';
import authReducer from './authReducer';

// Wiring up redux 
export default combineReducers ({
  auth: authReducer
});
