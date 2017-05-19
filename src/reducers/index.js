import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './authReducer';
import fighters from './fighterReducer';
import sqlImport from './sqlReducer';



const rootReducer = combineReducers({auth, routing: routerReducer, fighters, sqlImport});



export default rootReducer;