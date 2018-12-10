import React, {Component} from 'react';
import Gmap from '../components/Gmap';
import 'whatwg-fetch';

export default class MapContainer extends Component {


    constructor(props) {
        super(props);

        this.state = {
            coords: {latitude: 35.55951, longitude: -82.5515, zoom: 11},
            updated: false,
            lastTime: new Date(),
            // message: '',
            newMessage: false,
            seconds: 0
        };

        // console.log('this.state.coords.lat: ' + this.state.coords.lat);

        this.tick = this.tick.bind(this);
        this.update = this.update.bind(this);
    }

//willMount??     didUpdate?

    componentDidMount() {

        this.interval = setInterval(() => this.tick(), 10000); //in ms

        console.log(this.update.coords);

        this.setState({
            coords: this.update.coords,
            lastTime: new Date().toLocaleTimeString(),
            updated: true
        });

        fetch('https://localhost:1235/api/coords')
            .then(res => res.json())
            .then(json => {
                if (json.coords !== this.state.coords) {
                    console.log('json.coords: ' + json.coords);
                    console.log('state.coords: ' + this.state.coords);

                    fetch('/api/coords', {method: 'POST'})
                        .then(res => res.json())
                        .then(json => {
                            let coords = this.state.coords;
                            coords.push(json);
                            console.log('DB updated');
                            this.setState({
                                updated: true
                            });
                        })
                }
            })

            .catch(error => console.log('Coords not updated: ' + error));
    }

    update = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
                // this.setState({coords: {updateLat, updateLng}});
                console.log(pos);
                this.setState({coords: pos.coords});
            },
            (err) => {
                console.warn(`GeoLocationError: (${err.code}): ${err.message}`);
                this.setState({message: err.message, newMessage: true});

            }, {
                enableHighAccuracy: true,
                timeout:
                    10000,
                maximumAge:
                    0
            });

    };

    componentDidUpdate(prevProps, prevState, snapshot, pos) {

        // let updatedCoords = this.update();

        // let updateLat = pos.coords.latitude;
        // let updateLng = pos.coords.longitude;
        let updatedTime = new Date().toLocaleTimeString();

        if (this.state.coords !== prevState.coords) {
            this.setState({
                coords: this.state.coords,
                lastTime: new Date().toLocaleTimeString(),
                updated: true
            });
            // console.log('updateLat: ' + updateLat);
            // console.log('updateLng: ' + updateLng);
        }
        console.log('updatedTime: ' + updatedTime);
        console.log('updatedCoords: ' + this.state.coords);

        //
        // fetch('https://localhost:1235/api/coords')
        //     .then(res => res.json())
        //     .then(this.setState({
        //         updated: true
        //     }));
        //
        // console.log('updated: ' + this.state.updated);

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