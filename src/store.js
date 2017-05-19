import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';

// import the root reducer
import rootReducer from './reducers/index';

// create object for default data
const defaultState = {};

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);

const store = createStoreWithMiddleware(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// export const history = syncHistoryWithStore(browserHistory, store);

export default store;
