import React, {Component} from 'react';
import spartanLogo from '../assets/spartanLogo.png';
import MapContainer from '../containers/Map.container';

export default class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true,
            spin: 'topLogo clockwise', //todo: cleanup vars
        };

        // This binding is necessary to make `this` work in the callback
        this.logoClick = this.logoClick.bind(this);
    }


    // use state for rotation/effects:
    logoClick() {
        // e.preventDefault(); //prevent default link behavior

        //change rotation on click
        if (this.state.spin !== 'topLogo clockwise') {
            this.setState({spin: 'topLogo clockwise'})
        } else {
            this.setState({spin: 'topLogo unclockwise'})
        }
        let a = MapContainer; //think updates location (vs full refresh)
        console.log(a);
    }

    render() {
        console.log('logoClick:' + this.state.spin);

        const logoSpin = this.state.spin + ' shadow';

        return (
            <a href="#" onClick={this.logoClick}>
                <img src={spartanLogo} className={logoSpin} alt="logo"/>
            </a>
        );
    }
}

