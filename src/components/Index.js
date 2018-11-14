import React, {Component} from 'react';
import IndexTop from './IndexTop';
import IndexMap from './IndexMap';

export default class Index extends Component {
    render() {
        return (
            <div>
                <IndexTop/>
                <IndexMap/>
            </div>
        );
    }
}