import React, {Component} from 'react';
import AGIndexTop from './AGIndexTop';
import AGIndexMain from './AGIndexMain';
import AGIndexMap from './AGIndexMap';

import '../App.css';

export default class AGIndex extends Component {
    render() {
        return (
            <div className='AGIndexBack'>
                <AGIndexTop/>
                <AGIndexMain/>
                <AGIndexMap/>
            </div>
        );
    }
}