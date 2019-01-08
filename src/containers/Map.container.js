import React, {Component} from 'react';
import Gmap from '../components/Gmap';
import 'whatwg-fetch';

export default class MapContainer extends Component {


    constructor(props) {
        super(props);

        this.state = {
            currentCoords: {
                lat: 35.5595, lng: -82.5515, workDate: new Date(),
                zoom: 11
            },
            previousCoords: {
                lat: '', lng: '', workDate: ''
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


        //REPORT LOCAL GEOLO & SET STATE:
        navigator.geolocation.getCurrentPosition((pos) => {

                //FRESH location
                this.setState({
                    currentCoords: {
                        lat: pos.coords.latitude, lng: pos.coords.longitude,
                        workDate: new Date().toLocaleTimeString()
                    },
                    updated: true,
                    message: 'Live coords are: \n'
                });


                //RETRIEVE LATEST Server data:
                window.fetch('http://localhost:1235/api/coords', {mode: 'no-cors'}) //todo CORS back on
                    .then(
                        res => res.json
                    )
                    .then(json => {
                        console.log('fetched from DB:', json);
                        this.setState({
                            previousCoords: json.previousCoords,
                            updated: true,
                            message: 'Retrieved coords are: \n'
                        });
                        console.log('json.previousCoords: ' + json.previousCoords);

                    })
                    .catch(error => console.log('Coords NOT FETCHED from DB: ', error)
                    );

                //POST currentCoords or not:
                if (this.state.currentCoords !== this.state.previousCoords) {
                    console.log('this.state.currentCoords.lat: ' + this.state.currentCoords.lat);
                    console.log('this.state.previousCoords.lat: ' + this.state.previousCoords.lat);

                    console.log('updating DB...');

                    //POST
                    // //TODO: delete test model
                    window.fetch('http://localhost:1235/api/coords', {
                        method: 'POST', headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            currentCoords: this.state.currentCoords,
                            // login: 'hubot',
                        }),
                        mode: 'no-cors' //TODO: turn off
                    })
                        .then(res => res.json)
                        .then(json => {
                            console.log('DB updated');
                            this.setState({
                                updated: true
                            });

                        })
                        .catch(error => console.log('Coords NOT POSTED to DB: ' + error));

                    // console.log('UPDATE state.coords.lat: ' + this.state.coords.latitude) //leave here

                } // / IF
                else {
                    console.log('Coords NOT updated as Previous = Current')
                }


            }, //end callback

            (err) => {
                console.warn(`GeoLocation /\nYour problem Error: \n(${err.code}): ${err.message}`);
                this.setState({message: 'GeoLocation /\nYour problem Error: ' + err.message, updated: false});

            }, {
                enableHighAccuracy: true,
                timeout:
                    10000,
                maximumAge:
                    0
            })
        ;

//GET DB COORDS &
//         fetch('http://localhost:1235/api/coords', {mode: 'no-cors', method: 'POST'})
//             .then(res => res.json())
//             .then(json => {
//                 let coords = this.state.coords;
//                 coords.push(json);
//                 console.log('DB updated');
//                 this.setState({
//                     updated: true
//                 })
//
//             })
//             .catch(error => console.log('Coords NOT POSTED: ' + error));


    }

    componentDidUpdate(prevProps, prevState, snapshot) {


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
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

    render() {
        // console.log('MC Render state.coords.lat: ' + this.state.coords.latitude);
        return (
            <Gmap
                currentCoords={this.state.currentCoords}
                updated={this.state.updated}
                // lastTime={this.state.lastTime}
                message={this.state.message}
                // newMessage={this.state.newMessage} //redundant
            />
        );
    }
}