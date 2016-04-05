import { combineReducers } from 'redux';
import EstimatesReducer from './reducer_estimates';

const rootReducer = combineReducers({
  estimates: EstimatesReducer
});

export default rootReducer;
