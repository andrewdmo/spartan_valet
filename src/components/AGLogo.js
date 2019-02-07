import React, {Component} from 'react';
import AGLogo_2 from '../assets/AGLogo_2.jpg';
import MapContainer from "../containers/Map.container";
import AGIndex from "./AGIndex";

export default class AGLogo extends Component {
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
    logoClick = () => {
        // e.preventDefault(); //prevent default link behavior

        AGIndex.forceUpdate = (e) => {
            console.log('forceUpdate e: ' + e);
        };


        // console.log('updateLat: ' + this.updatePos.coords.lat);
        // let a = updatePos;
        //updatePos location (vs full refresh)
        // console.log('updatePos: ' + updatePos);


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
            <img src={AGLogo_2} className={logoSpin} onClick={this.logoClick} alt="logo"/>
        );
    }
}