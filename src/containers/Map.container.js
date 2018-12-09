import React, {Component} from 'react';
import Gmap from '../components/Gmap';
import 'whatwg-fetch';

export default class MapContainer extends Component {


    constructor(props) {
        super(props);

        this.state = {
            coords: {lat: 35.55951, lng: -82.5515, zoom: 11},
            updated: false,
            lastTime: new Date(),
            // message: '',
            newMessage: false,
            seconds: 0
        };

        // console.log('this.state.coords.lat: ' + this.state.coords.lat);

        // this.update = this.update.bind(this);
    }

//willMount??     didUpdate?

    componentDidMount() {

        this.interval = setInterval(() => this.tick(), 10000); //in ms

        navigator.geolocation.getCurrentPosition((pos) => {
                let newLat = pos.coords.latitude;
                let newLng = pos.coords.longitude;
                let newTime = new Date().toLocaleTimeString(); //doesn't include Date
                this.setState({coords: {lat: newLat, lng: newLng}, lastTime: newTime, updated: true});
                console.log('newLat: ' + newLat);
                console.log('newLng: ' + newLng);
                console.log('newTime: ' + newTime);
                return pos;
            },
            (err) => {
                console.warn(`GeoLocationError: (${err.code}): ${err.message}`);
                this.setState({message: err.message})
            }, {
                enableHighAccuracy: true,
                timeout:
                    5000,
                maximumAge:
                    0
            }
        );

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
                        });
                } else {
                    console
                        .log(
                            'Coords not updated'
                        )
                }
            });


// fetch('https://localhost:1235/api/coords', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })
//     .req.post()
//     .then(res => res.json())
//     .then(this.setState({
//         updated: true
//     }));


// fetch('https://localhost:1235/api/coords')
//     .then(res => res.json())
//     .then(this.setState({
//         updated: true
//     }));


// try {
//     fetch('/api/coords')
//         .then(res => res.json())
// } catch {
//     console.log('no prev coords found')
// }

    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        navigator.geolocation.getCurrentPosition((pos) => {
                let updateLat = pos.coords.latitude;
                let updateLng = pos.coords.longitude;
                let updatedTime = new Date().toLocaleTimeString();
                // this.setState({coords: {updateLat, updateLng}});

                if (pos.coords !== this.state.coords) {
                    this.setState({coords: {lat: updateLat, lng: updateLng}, lastTime: updatedTime, updated: true});
                    // console.log('updateLat: ' + updateLat);
                    // console.log('updateLng: ' + updateLng);
                    console.log('updatedTime: ' + updatedTime);
                    console.log('state.updated: ' + this.state.updated);
                } else {

                }
            },
            (err) => {
                console.warn(`GeoLocationError: (${err.code}): ${err.message}`);
                this.setState({message: err.message, newMessage: true});

            }, {
                enableHighAccuracy: true,
                timeout:
                    60000,
                maximumAge:
                    0
            });
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
                // message={this.state.message}
                newMessage={this.state.newMessage} //redundant
            />
        );
    }
}