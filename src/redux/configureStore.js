/* eslint-disable no-undef */
import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import createRootReducer from './reducers';
import common from "./reducers/common";

export const history = createBrowserHistory();

// const initialState = {coords: {lat: 35.55951, lng: -82.5515, zoom: 11}};

const composed = common || compose;

export const store = createStore(
    createRootReducer(history), // root reducer with router state
    composed(
        applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
            // ... other middlewares ...
        ),
    ),
);