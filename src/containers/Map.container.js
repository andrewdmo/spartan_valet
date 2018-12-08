import React, {Component} from 'react';
import Gmap from '../components/Gmap';
import 'whatwg-fetch';

export default class MapContainer extends Component {


    constructor(props) {
        super(props);

        this.state = {
            coords: {lat: 35.55951, lng: -82.5515, zoom: 11},
            updated: false,
            // message: '',
            newMessage: false,
            // seconds: 0
        };

        // console.log('this.state.coords.lat: ' + this.state.coords.lat);

        // this.update = this.update.bind(this);
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

//willMount??     didUpdate?

    componentDidMount() {

        this.interval = setInterval(() => this.tick(), 3000); //in ms

        navigator.geolocation.getCurrentPosition((pos) => {
                let newLat = pos.coords.latitude;
                let newLng = pos.coords.longitude;
                this.setState({coords: {lat: newLat, lng: newLng}});
                console.log('newLat: ' + newLat);
                console.log('newLng: ' + newLng);
            },
            (err) => {
                console.warn(`GeoLocationError: (${err.code}): ${err.message}`);
                this.setState({message: err.message, newMessage: true})
            }, {
                enableHighAccuracy: true,
                timeout:
                    5000,
                maximumAge:
                    0
            });

        fetch('https://localhost:1235/api/coords')
            .then(res => res.json())
            .then(json => {
                if (json.coords !== this.state.coords) {

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
    }
    ;

    componentDidUpdate(prevProps, prevState, snapshot) {

        // navigator.geolocation.getCurrentPosition((pos) => {
        //         let updateLat = pos.coords.latitude;
        //         let updateLng = pos.coords.longitude;
        //         // this.setState({coords: {updateLat, updateLng}});
        //         console.log('updateLat: ' + updateLat);
        //
        //         if (pos.coords !== this.state.coords) {
        //             this.setState({coords: {lat: updateLat, lng: updateLng}, updated: true});
        //         } else {
        //
        //         }
        //     },
        //     (err) => {
        //         console.warn(`ERROR(${err.code}): ${err.message}`);
        //         this.setState({message: err.message, newMessage: true});
        //
        //     }, {
        //         enableHighAccuracy: true,
        //         timeout:
        //             60000,
        //         maximumAge:
        //             0
        //     });
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

    render() {
        return (
            <Gmap
                coords={this.state.coords}
                updated={this.state.updated}
                // message={this.state.message}
                newMessage={this.state.newMessage}
            />
        );
    }
}