import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './authReducer';
import fighterProps from './fighterReducer';
import sqlImport from './sqlReducer';
import eventProps from './eventReducer';



const rootReducer = combineReducers({auth, routing: routerReducer, fighterProps, sqlImport, eventProps});



export default rootReducer;