import React, {Component} from 'react';
import Gmap from '../components/Gmap';
import {fitBounds} from "google-map-react/utils";


export default class MapGeo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            coords: {
                currentCoords: {
                    lat: 35.2222, lng: -82.0004, workDate: new Date().toLocaleTimeString()
                },
                lastCoords: {
                    lat: 35.1111, lng: -82.0003, workDate: ''
                },
                priorCoords: {
                    lat: 35.0001, lng: -82.0002, workDate: ''
                },
                initialCoords: {
                    lat: 35.3333, lng: -82.0001, workDate: ''
                },
            }, // coords

            LIVEupdated: false,
            DBupdated: false,
            newMessage: false,
            seconds: 0,
            zoom: 9,
            // center: {lat: 35.55953, lng: -82.5515},


            // combine like coords:
            currentMessage: 'searching', //todo add load spin
            lastMessage: 'LAST coords:',
            priorMessage: 'PRIOR coords: ',
            initialMessage: 'INITIAL coords: ',
        }; // this.state

        this.getFitBounds = this.getFitBounds.bind(this);
        // this.geolocation.getCurrentPosition = this.geolocation.getCurrentPosition.bind(this);

    } // constructor

    componentDidMount() {

        // 1. LIVE location + setState currentCoords: -----------------------------<

        const self = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {   //once LIVE geoLoc returned:

                    // console.log('GEOLO live!  new lat: ', pos.coords.latitude);

                    // this.newCoords(pos);
                    const newCoords = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        workDate: new Date().toLocaleTimeString()
                    };

                    // const newCoords = this;
                    this.setState(() => ({
                        coords: {
                            // currentCoords: newCoords
                            currentCoords: {
                                lat: pos.coords.latitude,
                                lng: pos.coords.longitude,
                                workDate: new Date().toLocaleTimeString()
                            },
                        }, // coords
                        LIVEupdated: true,
                        currentMessage: 'LIVE coords: '
                    })); // setState

                    console.log('GEOLO live!  new lat: ', pos.coords.latitude);
                }, //callback

                (err) => {
                    console.warn(`GeoLocation /\nyour problem Error: \n(${err.code}): ${err.message}`);
                    this.setState({
                        LIVEupdated: false,
                        currentMessage: 'GeoLocation /\n(YOUR) Error: ' + err.message,
                        coords: {currentCoords: {workDate: new Date().toLocaleTimeString()}}
                    });
                }, //error
                {
                    enableHighAccuracy: true,
                    timeout:
                        10000,
                    maximumAge:
                        0
                } //option
            ); //end NAV.geoLO
        }
    } //componentDidMount

    getFitBounds() {  // NO setState right now

        // console.log('GETFITBOUNDS current: ' + this.state.coords.currentCoords.lat +
        //     '\nlast: ' + this.state.coords.lastCoords.lat +
        //     '\nprior: ' + this.state.coords.priorCoords.lat +
        //     '\ninitial: ' + this.state.coords.initialCoords.lat);

        //LAT
        const maxLat = Math.max(this.state.coords.currentCoords.lat, this.state.coords.lastCoords.lat, this.state.coords.priorCoords.lat, this.state.coords.initialCoords.lat);
        const minLat = Math.min(this.state.coords.currentCoords.lat, this.state.coords.lastCoords.lat, this.state.coords.priorCoords.lat, this.state.coords.initialCoords.lat);
        //LONG
        const maxLng = Math.max(this.state.coords.currentCoords.lng, this.state.coords.lastCoords.lng, this.state.coords.priorCoords.lng, this.state.coords.initialCoords.lng);
        const minLng = Math.min(this.state.coords.currentCoords.lng, this.state.coords.lastCoords.lng, this.state.coords.priorCoords.lng, this.state.coords.initialCoords.lng);

        //may need to change:
        const bounds = {

            ne: {lat: maxLat, lng: maxLng}, //long is -
            sw: {lat: minLat, lng: minLng},

            // nw: {lat: maxLat, lng: minLng},
            // se: {lat: minLat, lng: maxLng},

        };

        // console.log('maxLat: ', maxLat);
        // console.log('minLat: ', minLat);
        // console.log('maxLng: ', maxLng);
        // console.log('minLng: ', minLng);

        const size = {
            // width: 640, // Map width in pixels
            // height: 380, // Map height in pixels

            //viewport:
            width: window.innerWidth,
            height: window.innerHeight,
        };
        // console.log('size.heaight: ', size.height);

        const {center, zoom} = fitBounds(bounds, size);

        // console.log('zoom: ' + zoom);
        // console.log('center.lat: ' + center.lat);
        // console.log('center.lng: ' + center.lng);

        // this.setState({zoom: zoom, center: center});

        // const newCenter = {
        //     lat: (center.lat * .8),
        //     lng: center.lng
        // };
        // console.log('newCenter: ', newCenter.lat);

        // const center2 = center;
        // center2.lat = (center2.lat * .8); //doesn't work, shorten for header

        // const zoom = 9;

        return {center, zoom};

    }; //getFitBounds

    render() {

        // return null;

        // return {coords: this.state.coords};

        // return React.createElement("coords", {coords: this.state.coords})

        console.log(
            'RENDER current: ' + this.state.coords.currentCoords.lat +
            '\nlast: ' + this.state.coords.lastCoords.lat +
            '\nprior: ' + this.state.coords.priorCoords.lat +
            '\ninitial: ' + this.state.coords.initialCoords.lat
        );

        // const {center, zoom} = this.getFitBounds();
        const {center, zoom} = this.getFitBounds();


        console.log('LIVEupdated: ', this.state.LIVEupdated);
        console.log('DBupdated: ', this.state.DBupdated);
        console.log('zoom: ', zoom);

        return (
            <Gmap

                coords={this.state.coords}
                // currentCoords={this.state.coords.currentCoords}
                // lastCoords={this.state.coords.lastCoords}
                // priorCoords={this.state.coords.priorCoords}
                // initialCoords={this.state.coords.initialCoords}
                //
                LIVEupdated={this.state.LIVEupdated}
                DBupdated={this.state.DBupdated}
                newMessage={this.state.newMessage} //redundant
                seconds={0}

                center={center} //single bracket
                zoom={zoom} //single bracket
                currentMessage={this.state.currentMessage}
                lastMessage={this.state.lastMessage}
                priorMessage={this.state.priorMessage}
                initialMessage={this.state.initialMessage}
            />
        )
    }
} // CLASS