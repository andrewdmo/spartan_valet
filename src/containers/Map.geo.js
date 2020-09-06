import React, {Component} from 'react';
import Gmap from '../components/Gmap';

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
                olderCoords: {
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
            center: {lat: 35.55953, lng: -82.5515},


            // combine like coords:
            currentMessage: 'searching', //todo add load spin
            lastMessage: 'LAST msg:',
            olderMessage: 'older msg: ',
            initialMessage: 'INITIAL msg: ',
        }; // this.state

        // this.getFitBounds = this.getFitBounds.bind(this);
        // this.geolocation.getCurrentPosition = this.geolocation.getCurrentPosition.bind(this);

    } // constructor

    componentDidMount() {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(
                (pos) => {   //once LIVE geoLoc returned:

                    console.log('DidMOUNT geo started');

                    this.setState(() => ({
                        coords: {

                            olderCoords: {
                                lat: this.state.coords.lastCoords.lat,
                                lng: this.state.coords.lastCoords.lng,
                                workDate: this.state.coords.lastCoords.workDate
                            },

                            lastCoords: {
                                lat: this.state.coords.currentCoords.lat,
                                lng: this.state.coords.currentCoords.lng,
                                workDate: this.state.coords.currentCoords.workDate
                            },

                            currentCoords: {
                                lat: pos.coords.latitude,
                                lng: pos.coords.longitude,
                                workDate: new Date().toLocaleTimeString()
                            },

                            initialCoords: this.state.coords.initialCoords
                        }, // coords
                        LIVEupdated: true,
                        currentMessage: 'LIVE coords: '
                    })); // setState

                    console.log('GEOLO live!  new lat: ', pos.coords.latitude);
                }, //callback

                (err) => {
                    console.warn(`GeoLocation /\nyour problem Error: \n(${err.code}): ${err.message}`);

                    // TODO update function (timestamp)

                }, //error
                {
                    enableHighAccuracy: true,
                    timeout:
                        10000,
                    maximumAge:
                        0
                } //option
            ); //end NAV.geoLO
        } // if (geo)
        else {
            console.log('no geo')
        }
    } //componentDidMount

    componentDidUpdate() {

        if (this.state.LIVEupdated !== false) {     //  1st IF, skip geo if no state update

            console.log('DidUPDATE geo started');

            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    if ((pos.coords.latitude !== this.state.coords.currentCoords.lat) ||
                        (pos.coords.longitude !== this.state.coords.currentCoords.lng)) {

                        console.log('coords updated');
                        this.setState(() => ({
                            coords: {

                                olderCoords: {
                                    lat: this.state.coords.lastCoords.lat,
                                    lng: this.state.coords.lastCoords.lng,
                                    workDate: this.state.coords.lastCoords.workDate
                                },

                                lastCoords: {
                                    lat: this.state.coords.currentCoords.lat,
                                    lng: this.state.coords.currentCoords.lng,
                                    workDate: this.state.coords.currentCoords.workDate
                                },

                                currentCoords: {
                                    lat: pos.coords.latitude,
                                    lng: pos.coords.longitude,
                                    workDate: new Date().toLocaleTimeString()
                                },

                                initialCoords: this.state.coords.initialCoords
                            }, // coords
                            LIVEupdated: true,
                            currentMessage: 'LIVE coords: '
                        })); // setState

                        console.log('GEOLO live!  new lat: ', pos.coords.latitude);
                    } else {
                        console.log('coords identical, no state update')
                    }      // state update if coords different
                },      //success callback

                (err) => {
                    console.warn(`GeoLocation /\nyour problem Error: \n(${err.code}): ${err.message}`);
                },
                {
                    enableHighAccuracy: true,
                    timeout:
                        10000,
                    maximumAge:
                        0
                } //options
            );      // NAV.getCurrentPosition

            // navigator.geolocation.getCurrentPosition((pos) => {   //once LIVE geoLoc returned:


            // },       // successful callback

            // (err) => {
            //     console.warn(`GeoLocation /\nyour problem Error: \n(${err.code}): ${err.message}`);
            //     // this.setState({
            //     //     LIVEupdated: false,
            //     //     currentMessage: 'GeoLocation /\n(YOUR) Error: ' + err.message,
            //     //     coords: {
            //     //         olderCoords: {
            //     //             lat: this.state.coords.lastCoords.lat,
            //     //             lng: this.state.coords.lastCoords.lng,
            //     //             workDate: this.state.coords.lastCoords.workDate
            //     //         },
            //     //         lastCoords: {
            //     //             lat: this.state.coords.currentCoords.lat,
            //     //             lng: this.state.coords.currentCoords.lng,
            //     //             workDate: this.state.coords.currentCoords.workDate
            //     //         },
            //     //         currentCoords: {workDate: new Date().toLocaleTimeString()},
            //     //         initialCoords: this.state.coords.initialCoords
            //     //     },
            //     // });         //setState
            // }, //error


            // ); //end NAV.geoLO
        }       //  1st IF, skip geo if no state update
        else {
            console.log('didUPDATE no geo')
        }
    }       //componentDidUpdate

    // TODO: fix
// getFitBounds() {  // flex map zoom, NO setState right now
//
//     console.log('GETFITBOUNDS current: ' + this.state.coords.currentCoords.lat +
//         '\nlast: ' + this.state.coords.lastCoords.lat +
//         '\nolder: ' + this.state.coords.olderCoords.lat +
//         '\ninitial: ' + this.state.coords.initialCoords.lat);
//
//     //LAT
//     const maxLat = Math.max(this.state.coords.currentCoords.lat, this.state.coords.lastCoords.lat, this.state.coords.olderCoords.lat, this.state.coords.initialCoords.lat);
//     const minLat = Math.min(this.state.coords.currentCoords.lat, this.state.coords.lastCoords.lat, this.state.coords.olderCoords.lat, this.state.coords.initialCoords.lat);
//     //LONG
//     const maxLng = Math.max(this.state.coords.currentCoords.lng, this.state.coords.lastCoords.lng, this.state.coords.olderCoords.lng, this.state.coords.initialCoords.lng);
//     const minLng = Math.min(this.state.coords.currentCoords.lng, this.state.coords.lastCoords.lng, this.state.coords.olderCoords.lng, this.state.coords.initialCoords.lng);
//
//     //may need to change:
//     const bounds = {
//
//         ne: {lat: maxLat, lng: maxLng}, //long is -
//         sw: {lat: minLat, lng: minLng},
//
//         // nw: {lat: maxLat, lng: minLng},
//         // se: {lat: minLat, lng: maxLng},
//
//     };
//
//     // console.log('maxLat: ', maxLat);
//     // console.log('minLat: ', minLat);
//     // console.log('maxLng: ', maxLng);
//     // console.log('minLng: ', minLng);
//
//     const size = {
//         // width: 640, // Map width in pixels
//         // height: 380, // Map height in pixels
//
//         //viewport:
//         width: window.innerWidth,
//         height: window.innerHeight,
//     };
//     // console.log('size.heaight: ', size.height);
//
//     const {center, zoom} = fitBounds(bounds, size);
//
//     // console.log('zoom: ' + zoom);
//     // console.log('center.lat: ' + center.lat);
//     // console.log('center.lng: ' + center.lng);
//
//     // this.setState({zoom: zoom, center: center});
//
//     // const newCenter = {
//     //     lat: (center.lat * .8),
//     //     lng: center.lng
//     // };
//     // console.log('newCenter: ', newCenter.lat);
//
//     // const center2 = center;
//     // center2.lat = (center2.lat * .8); //doesn't work, shorten for header
//
//     // const zoom = 9;
//
//     return {center, zoom};
//
// };  //getFitBounds

    render() {

        // const {center, zoom} = this.getFitBounds();

        console.log(
            'RENDER current: ' + this.state.coords.currentCoords.lat +
            '\nlast: ' + this.state.coords.lastCoords.lat +
            '\nolder: ' + this.state.coords.olderCoords.lat +
            '\ninitial: ' + this.state.coords.initialCoords.lat +
            '\nLIVEupdated: ', this.state.LIVEupdated +
            '\nDBupdated: ', this.state.DBupdated +
            '\ncurrentMessage: ', this.state.currentMessage
        );

        return (
            <Gmap
                coords={this.state.coords}
                // currentCoords={this.state.coords.currentCoords}
                // lastCoords={this.state.coords.lastCoords}
                // olderCoords={this.state.coords.olderCoords}
                // initialCoords={this.state.coords.initialCoords}
                //
                LIVEupdated={this.state.LIVEupdated}
                DBupdated={this.state.DBupdated}
                newMessage={this.state.newMessage} //redundant
                seconds={0}

                center={this.state.center} //single bracket
                zoom={this.state.zoom} //single bracket
                // center={center} //single bracket
                // zoom={zoom} //single bracket
                currentMessage={this.state.currentMessage}
                lastMessage={this.state.lastMessage}
                olderMessage={this.state.olderMessage}
                initialMessage={this.state.initialMessage}
            />
        )
    }
} // CLASS
