import React, {Component} from 'react';
import spartanLogo from '../assets/spartanLogo.png';
import MapContainer from "../containers/Map.container";

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
    logoClick = (e) => {
        // e.preventDefault(); //prevent default link behavior

        MapContainer.forceUpdate = (e) => {
            console.log('forceUpdate e: ' + e);
        };


        // console.log('updateLat: ' + this.update.coords.lat);
        // let a = update;
        //update location (vs full refresh)
        // console.log('update: ' + update);


        //change rotation on click
        if (this.state.spin !== 'topLogo clockwise') {
            this.setState({spin: 'topLogo clockwise'})
        } else {
            this.setState({spin: 'topLogo unclockwise'})
        }

    };

    render() {
        console.log('logoClick:' + this.state.spin);

        const logoSpin = this.state.spin + ' shadow';

        return (
            <img src={spartanLogo} className={logoSpin} onClick={this.logoClick} alt="logo"/>
        );
    }
}