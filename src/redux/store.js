import {createStore} from 'redux';
import reducer from './reducer';
// import createHistory from 'history/createBrowserHistory';
// import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
// import thunk from 'redux-thunk';

// export const history = createHistory();


// Build the middleware for intercepting and dispatching navigation actions
//const myRouterMiddleware = routerMiddleware(history);
export const store = createStore(reducer);
console.log(store);