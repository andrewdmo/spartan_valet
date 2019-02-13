import React, {Component} from 'react';
import AGLogo from "./AGLogo";
import AGLogo_ from '../assets/AGLogo_.jpg'


export default class AGIndexTop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fade: "out"
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setState({fade: "in"}); //not used
    }

    render() {

        return (
            <div className="top">
                <img src={AGLogo_} alt={'AGLogo'} className="AGBackPic shadow"/>
                <AGLogo/> {/*spinning object*/}
                <h1 className="topTitle shadow">AG3: the Future of Now</h1>
            </div>
        );
    }
}