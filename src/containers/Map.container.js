import React, {Component} from 'react';
import Gmap from '../components/Gmap';
import 'whatwg-fetch';
// import {GoogleMap} from 'google-map-react';
import 'google-map-react/utils';
import {fitBounds} from "google-map-react/utils";
// import {FitBounds} from './FitBounds';


export default class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {

            coords: {
                currentCoords: {
                    lat: 35.55953, lng: -82.5515, workDate: new Date().toLocaleTimeString(),
                    zoom: 11
                },
                lastCoords: {
                    lat: 35.2222, lng: -82.2222
                },
                priorCoords: {
                    lat: 35.1111, lng: -82.1111
                },
                initialCoords: {
                    lat: 35.0001, lng: -82.0001
                },
            },
            updated: false,
            newMessage: false,
            seconds: 0,

            zoom: 11,
            center: {lat: 35.55953, lng: -82.5515},

            currentMessage: '',
            lastMessage: '',
            priorMessage: 'PRIOR coords were: ',
            initialMessage: 'INITIAL coords were: ',
        };


        // this.fitBounds = this.fitBounds.bind(this);
        this.getFitBounds = this.getFitBounds.bind(this);
        this.tick = this.tick.bind(this);
        // this.updatePos = this.updatePos.bind(this);
    }


    componentDidMount() {

        //TODO turn back on:
        // this.interval = setInterval(() => this.tick(), 10000); //in ms


// 1. LIVE location + setState currentCoords: -----------------------------<

        navigator.geolocation.getCurrentPosition((pos) => {   //once LIVE geoLoc returned:

                // set currentCoords w/ live geoLoc no matter what:
                console.log('GeoLo live!');
                this.setState({
                    priorCoords: this.state.lastCoords,
                    lastCoords: this.state.currentCoords,
                    currentCoords: {
                        lat: pos.coords.latitude, lng: pos.coords.longitude,
                        workDate: new Date().toLocaleTimeString()
                    },
                    updated: true,
                    currentMessage: 'LIVE coords are: \n',
                });

                // 3. POST currentCoords or not: -----------------------------<

                if (this.state.currentCoords) {
                    if (this.state.currentCoords !== this.state.priorCoords) {

                        console.log('coords different, updating DB...');

                        // if yes POST:
                        window.fetch('http://localhost:1235/api/coords', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                // 'Vary': 'Origin', // for specific URLs @ dif IPs
                            },
                            body: JSON.stringify({
                                currentCoords: this.state.currentCoords,
                                // login: 'hubot',
                            }),
                            mode: 'no-cors', //TODO: turn off
                            credentials: "same-origin"
                        })
                            .then(res => res.json)
                            .then(json => {
                                console.log('DB updated' + json);
                                this.setState({
                                    updated: true
                                });
                                // this.getFitBounds();


                            })

                            // from POST req
                            .catch(error => console.log('Coords NOT POSTED to DB: ' + error));

                        // console.log('UPDATE state.coords.lat: ' + this.state.coords.latitude) //leave here

                    } // END if
                    else {
                        console.log('Coords NOT updated as Last = Current')
                    }
                }// IF (to POST)

                return pos;
            }, //end nav.geoLo callback

            (err) => {
                console.warn(`GeoLocation /\nYour problem Error: \n(${err.code}): ${err.message}`);
                this.setState({
                    message: 'GeoLocation /\n(YOUR) Error: ' + err.message,
                    updated: false
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


// 2. RETRIEVE latest Server data: -----------------------------<
//  (ASYCrously:)

        window
            .fetch(
                'http://localhost:1235/api/coords', {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        // 'Vary': 'Origin', // for specific URLs @ dif IPs
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: "same-origin",
                    reqDate: new Date()

                    // mode: "no-cors" //careful with use
                }
            )
            .then(res => {
                console.log('DB status code: ' + res.status); // 200 if good
                return res.json()
            })


            .then(json => {
                    console.log('priorCoords.lat from DB:', json.priorCoords.lat);
                    this.setState({
                        priorCoords: json.priorCoords,
                        lastCoords: json.lastCoords,
                        // currentCoords: json.currentCoords,
                        // currentCoords: priorCoords,
                        updated: true,
                        lastMessage: 'RETRIEVED coords are: \n'
                    }); // setState
                    // this.getFitBounds();


                }
            )

            // from original FETCH
            .catch(error => {
                console
                    .log(
                        'Coords NOT FETCHED from DB: ', error)
            });


    } //componentDidMount

    componentDidUpdate(prevProps, prevState, snapshot) {

        // this.getFitBounds();


        // console.log('client UPDATED');

        // navigator.geolocation.getCurrentPosition((pos) => {
        //         console.log('pos ' + pos.coords.latitude + 'prevState: ' + prevState.coords.latitude);
        //
        //         console.log();
        //         if (pos.coords.latitude !== prevState.coords.latitude || pos.coords.longitude !== prevState.coords.longitude) {
        //             this.setState({coords: pos.coords, lastTime: new Date()});
        //             console.log('UPDATE x2: ' + pos.coords.latitude); //leave here to verify call
        //
        //         } else {
        //             // this.setState({lastTime: new Date()});
        //             console.log('NO new coords @ ' + new Date().toLocaleTimeString()); //leave here to verify call
        //         }
        //     },
        //
        //     (err) => {
        //         console.warn(`GeoLocationError: (${err.code}): ${err.message}`);
        //         this.setState({message: 'GeoLocationError: ' + err.message});
        //
        //     }, {
        //         enableHighAccuracy: true,
        //         timeout:
        //             60000,
        //         maximumAge:
        //             0
        //     }
        // )

    } //Did Update

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // fit() {
    //     let bounds = new GoogleMaps.LatLngBounds();
    //
    //     nextProps.places.forEach(p => {
    //         bounds.extend(new google.maps.LatLng(p.lat, p.lng))
    //     })
    //
    //     // GET NW, SE BY NE, SW
    //     const ne = bounds.getNorthEast()
    //     const sw = bounds.getSouthWest()
    //     const nw = {lat: ne.lat(), lng: sw.lng()}
    //     const se = {lat: sw.lat(), lng: ne.lng()}
    //     const {center, zoom} = fitBounds({
    //         se: {lat: se.lat, lng: se.lng},
    //         nw: {lat: nw.lat, lng: nw.lng}
    //     }, {width: 225, height: 777})
    //
    //     this.setState({center, zoom})
    // }

    getFitBounds() {

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

        console.log('maxLat: ', maxLat);
        console.log('minLat: ', minLat);
        console.log('maxLng: ', maxLng);
        console.log('minLng: ', minLng);


        const size = {
            // width: 640, // Map width in pixels
            // height: 380, // Map height in pixels

            //viewport:
            width: window.innerWidth,
            height: window.innerHeight,
        };
        // console.log('size.heaight: ', size.height);

        const {center, zoom} = fitBounds(bounds, size);

        console.log('zoom: ' + zoom);
        console.log('center.lat: ' + center.lat);
        console.log('center.lng: ' + center.lng);


        // this.setState({zoom: zoom, center: center});

        // const newCenter = {
        //     lat: (center.lat * .8),
        //     lng: center.lng
        // };
        // console.log('newCenter: ', newCenter.lat);

        return {center, zoom};

    }; //getFitBounds


    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    } //tick

    // //LAT


    render() {

        // const {center, zoom} = this.getFitBounds();
        const {center, zoom} = this.getFitBounds();

        console.log(zoom);
        console.log('current: ' + this.state.coords.currentCoords.lng +
            '\nlast: ' + this.state.coords.lastCoords.lng +
            '\nprior: ' + this.state.coords.priorCoords.lng +
            '\ninitial: ' + this.state.coords.initialCoords.lng
        );

        return (
            <Gmap

                coords={this.state.coords}
                // currentCoords={this.state.currentCoords}
                // lastCoords={this.state.lastCoords}
                // priorCoords={this.state.priorCoords}
                // initialCoords={this.state.initialCoords}

                updated={this.state.updated}
                newMessage={this.state.newMessage} //redundant
                seconds={0}

                center={center} //single bracket
                zoom={zoom} //single bracket
                currentMessage={this.state.currentMessage}
                lastMessage={this.state.lastMessage}
                priorMessage={this.state.priorMessage}
                initialMessage={this.state.initialMessage}

            />
        );
    }
}