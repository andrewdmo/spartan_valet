import React, {Component} from 'react';
import Gmap from '../components/Gmap';
import 'whatwg-fetch';

export default class MapContainer extends Component {


    constructor(props) {
        super(props);

        this.state = {
            currentCoords: {
                lat: 35.55953, lng: -82.5515, workDate: new Date().toLocaleTimeString(),
                zoom: 11
            },
            lastCoords: {
                lat: 35.2222, lng: -82.5515
            },
            priorCoords: {
                lat: 35.1111, lng: -82.5515
            },
            initialCoords: {
                lat: 35.0001, lng: -82.5515
            },

            updated: false,
            message: 'Default coords are: \n',
            newMessage: false,
            seconds: 0
        };


        // console.log('this.state.coords.lat: ' + this.state.coords.lat);

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
                    message: 'Live coords are: \n'
                });
                return pos;
            }, //end nav.geoLo callback

            (err) => {
                console.warn(`GeoLocation /\nYour problem Error: \n(${err.code}): ${err.message}`);
                this.setState({
                    message: 'GeoLocation /\nYOUR problem Error: ' + err.message,
                    updated: false
                });
            }, //end error callback

            {
                enableHighAccuracy: true,
                timeout:
                    10000,
                maximumAge:
                    0
            } //end option callback
        );

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
                        priorCoords: this.state.lastCoords,
                        lastCoords: this.state.currentCoords,
                        currentCoords: json.currentCoords,
                        // currentCoords: priorCoords,
                        updated: true,
                        message: 'Retrieved coords are: \n'
                    }); // setState


                    // 3. POST currentCoords or not: -----------------------------<


                    if (this.state.currentCoords !== json.currentCoords) {

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

                            })

                            // from POST req
                            .catch(error => console.log('Coords NOT POSTED to DB: ' + error));

                        // console.log('UPDATE state.coords.lat: ' + this.state.coords.latitude) //leave here

                    } // END if
                    else {
                        console.log('Coords NOT updated as prior = Current')
                    }
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


    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

    render() {
        console.log('current: ' + this.state.currentCoords.lat +
            '\nlast: ' + this.state.lastCoords.lat +
            '\nprior: ' + this.state.priorCoords.lat +
            '\ninitial: ' + this.state.initialCoords.lat
        );
        return (
            <Gmap
                currentCoords={this.state.currentCoords}
                lastCoords={this.state.lastCoords}
                priorCoords={this.state.priorCoords}
                initalCoords={this.state.initialCoords}

                updated={this.state.updated}
                // lastTime={this.state.lastTime}
                message={this.state.message}
                newMessage={this.state.newMessage} //redundant
                seconds={0}
            />
        );
    }
}