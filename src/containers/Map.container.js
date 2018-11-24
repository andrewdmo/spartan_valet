import React, {Component} from 'react';
import Gmap from '../components/Gmap';

export default class MapContainer extends Component {


    constructor(props) {
        super(props);

        this.state = {coords: {lat: 35.55951, lng: -82.5515, zoom: 11}, updated: false};

        console.log('this.state.coords.lat: ' + this.state.coords.lat);

        // this.update = this.update.bind(this);
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

        // fetch('/api/counters', { method: 'POST' })
        //     .then(res => res.json())
        //     .then(json => {
        //         this.setState({
        //             counters: json
        //         });
        //     });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        navigator.geolocation.getCurrentPosition((pos) => {
                let updateLat = pos.coords.latitude;
                let updateLng = pos.coords.longitude;
                // this.setState({coords: {updateLat, updateLng}});
                console.log('updateLat: ' + updateLat);

                if (pos.coords !== this.state.coords) {
                    this.setState({coords: {lat: updateLat, lng: updateLng}, updated: true});
                }
            },
            (err) => {
                console.warn(`ERROR(${err.code}): ${err.message}`);

            }, {
                enableHighAccuracy: true,
                timeout:
                    60000,
                maximumAge:
                    0
            })
    }

    // return {coords: {lat: updatedLat, lng: updatedLng}};


    // console.log('update: ' + update);


    // navigator.geolocation.getCurrentPosition((pos) => {
    //         let newLat = pos.coords.latitude;
    //         let newLng = pos.coords.longitude;
    //         console.log('newUpdatedLat: ' + newLat);
    //         this.setState({coords: {lat: newLat, lng: newLng}});
    //         console.log('updatedLoLat: ' + this.state.coords.lat);
    //     },
    //     (err) => {
    //         console.warn(`ERROR(${err.code}): ${err.message}`);
    //     }, {
    //         enableHighAccuracy: true,
    //         timeout:
    //             60000,
    //         maximumAge:
    //             0
    //     });


    render() {
        return (
            <Gmap
                coords={this.state.coords}
                updated={this.state.updated}
            />
        );
    }
}