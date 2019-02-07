import React, {Component} from 'react';
import AGLogo from "./AGLogo";
import AGLogo_ from '../assets/AGLogo_.jpg'

export default class AGIndexTop extends Component {


    render() {
        return (
            <div className="top">
                <img src={AGLogo_} alt={'AGLogo'} className="backPic"/>
                <AGLogo/>
                <h1 className="topTitle shadow">AG3: the Future of Now</h1>
            </div>
        );
    }
}