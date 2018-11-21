import React, {Component} from 'react';
import Gmap from '../components/Gmap';

export default class MapContainer extends Component {


    constructor(props) {
        super(props);

        this.state = {coords: {lat: 35.55951, lng: -82.5515, zoom: 11}};

        console.log('this.state.coords.lat: ' + this.state.coords.lat);

    }

//willMount??     didUpdate?

    componentDidMount() {

        navigator.geolocation.getCurrentPosition((pos) => {
                let newLat = pos.coords.latitude;
                let newLng = pos.coords.longitude;
                console.log('newLat: ' + newLat);
                this.setState({coords: {lat: newLat, lng: newLng}});
                console.log('thisLoLat: ' + this.state.coords.lat);
            },
            (err) => {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }, {
                enableHighAccuracy: true,
                timeout:
                    60000,
                maximumAge:
                    0
            });
    };


    // update() {
    //     navigator.geolocation.getCurrentPosition((pos) => {
    //         const updatedLat = pos.coords.latitude;
    //         const updatedLng = pos.coords.longitude;
    //         console.log('newCoords: ' + updatedLat + updatedLng);
    //     });
    //
    //     // Typical usage (don't forget to compare props):
    //     if (navigator.geolocation.getCurrentPosition) != (this.pos)
    //
    //         // this.fetchData(this.state.coords);
    //         this.setState({coords: this.state.coords})
    //     }
    //
    // }

    render() {
        return (
            <Gmap coords={this.state.coords}/>
        );
    }
}