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
            // message: '',
            newMessage: false,
            seconds: 0
        };

        // console.log('this.state.coords.lat: ' + this.state.coords.lat);

        this.tick = this.tick.bind(this);
        this.updatePos = this.updatePos.bind(this);
    }

//willMount??     didUpdate?

    componentDidMount() {

        //TODO turn back on:
        // this.interval = setInterval(() => this.tick(), 10000); //in ms


        this.setState({
            coords: navigator.geolocation.getCurrentPosition((pos) => {

                    console.log('UPDATE pos: ' + pos.coords);
                    this.setState({coords: pos.coords});
                    console.log('UPDATE state.coords.lat: ' + this.state.coords.latitude)
                },

                (err) => {
                    console.warn(`GeoLocationError: (${err.code}): ${err.message}`);
                    this.setState({message: err.message, newMessage: true});

                }, {
                    enableHighAccuracy: true,
                    timeout:
                        3000,
                    maximumAge:
                        0
                }),
            lastTime: new Date().toLocaleTimeString(),
            updated: true
        });


        // fetch('https://localhost:1235/api/coords')
        //     .then(res => res.json())
        //     .then(json => {
        //         if (json.coords !== this.state.coords) {
        //             console.log('json.coords: ' + json.coords);
        //             console.log('state.coords: ' + this.state.coords);
        //
        //             fetch('/api/coords', {method: 'POST'})
        //                 .then(res => res.json())
        //                 .then(json => {
        //                     let coords = this.state.coords;
        //                     coords.push(json);
        //                     console.log('DB updated');
        //                     this.setState({
        //                         updated: true
        //                     });
        //                 })
        //         }
        //     })
        //     .catch(error => console.log('DB: Coords not updated: ' + error));
    }

    updatePos = () => {
        navigator.geolocation.getCurrentPosition((pos) => {

                console.log('UPDATE pos: ' + pos);
                // this.setState({coords: pos.coords});
                this.componentDidUpdate(pos);
            },

            (err) => {
                console.warn(`GeoLocationError: (${err.code}): ${err.message}`);
                this.setState({message: err.message, newMessage: true});

            }, {
                enableHighAccuracy: true,
                timeout:
                    7000,
                maximumAge:
                    0
            })
    };


    componentDidUpdate(prevProps, prevState, snapshot) {


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
        return (
            <Gmap
                coords={this.state.coords}
                updated={this.state.updated}
                lastTime={this.state.lastTime}
                // message={this.state.message}
                newMessage={this.state.newMessage} //redundant
            />
        );
    }
}