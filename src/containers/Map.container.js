import React, {Component} from 'react';
import Gmap from '../components/Gmap';
import 'whatwg-fetch';

export default class MapContainer extends Component {


    constructor(props) {
        super(props);

        this.state = {
            coords: {latitude: 35.5595, longitude: -82.5515, zoom: 11},
            updated: false,
            lastTime: new Date(),
            message: 'Default coords are: \n',
            newMessage: false,
            seconds: 0
        };

        // console.log('this.state.coords.lat: ' + this.state.coords.lat);

        this.tick = this.tick.bind(this);
        // this.updatePos = this.updatePos.bind(this);
    }

//willMount??     didUpdate?

    componentDidMount() {

        //TODO turn back on:
        // this.interval = setInterval(() => this.tick(), 10000); //in ms


        //REPORT LOCAL GEOLO & SET STATE:
        navigator.geolocation.getCurrentPosition((pos) => {


                this.setState({
                    coords: pos.coords, lastTime: new Date(), updated: true, message: 'Updated coords are: \n'
                });

                fetch('http://localhost:1235/api/coords', {mode: 'no-cors'}) //todo CORS back on
                    .then(
                        res => res.json
                    )
                    .then(coords => console.log('fetched from DB:' + {coords}
                    ))
                    .catch(error => console.log('Coords NOT FETCHED from DB: ' + error)
                    );


                //TODO: delete test model
                fetch('http://localhost:1235/api/coords', {method: 'POST', mode: 'no-cors'})
                    .then(res => res.json())
                    .then(json => {
                        const coords = this.state.coords;
                        coords.push(json);
                        console.log('DB updated');
                        this.setState({
                            updated: true
                        });
                    })
                    .catch(error => console.log('Coords NOT POSTED to DB: ' + error));

                // console.log('UPDATE state.coords.lat: ' + this.state.coords.latitude) //leave here
            },

            (err) => {
                console.warn(`GeoLocationError: (${err.code}): ${err.message}`);
                this.setState({message: 'GeoLocationError: ' + err.message, updated: false});

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
                coords={this.state.coords}
                updated={this.state.updated}
                lastTime={this.state.lastTime}
                message={this.state.message}
                // newMessage={this.state.newMessage} //redundant
            />
        );
    }
}