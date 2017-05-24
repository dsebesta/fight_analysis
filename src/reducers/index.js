import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './authReducer';
import fighters from './fighterReducer';
import sqlImport from './sqlReducer';
import eventProps from './eventReducer';



const rootReducer = combineReducers({auth, routing: routerReducer, fighters, sqlImport, eventProps});



export default rootReducer;