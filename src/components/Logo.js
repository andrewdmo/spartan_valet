import React, {Component} from 'react';
import spartanLogo from '../assets/spartanLogo.png';

export default class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    // handleClick() {
    //     this.setState(state => ({
    //         isToggleOn: !state.isToggleOn
    //     }));
    // }

    //use state for rotation/effects
    handleClick() {
        return (<a href={spartanLogo}>
                <img src={spartanLogo} className="topLogo2" alt="logo" onClick={this.handleClick}/>
            </a>
        )
    }

    render() {
        return (
            <a href={spartanLogo}>
                <img src={spartanLogo} className="topLogo" alt="logo" onClick={this.handleClick}/>
            </a>
        );
    }

}