import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// import {Switch, Route} from 'react-router-dom';
// import ConnectedRouter from 'connected-react-router';
import {store} from './redux/configureStore';
// import * as mongoose from "mongoose";


import './index.css';

ReactDOM.render((
        <Provider store={store}>
            <App/>
        </Provider>
    ),
    document.getElementById('root')
);