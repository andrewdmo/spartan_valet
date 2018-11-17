import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import common from "./reducers/common";

export default (history) => combineReducers({
    common: common,
    router: connectRouter(history),
    // rest of your reducers
})