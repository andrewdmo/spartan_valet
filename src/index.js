import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {Switch, Route} from 'react-router-dom';
import ConnectedRouter from 'connected-react-router';
import {store, history} from './redux/configureStore';


ReactDOM.render((
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/" component={App}/>
                </Switch>
            </ConnectedRouter>
        </Provider>
    ),
    document.getElementById('root')
);