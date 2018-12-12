import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';


// from: https://www.npmjs.com/package/google-map-react
// this is the 'circle' in middle of map
const ExampleComponent = ({message}) => (
    <div style={{
        color: 'white',
        border: '10px',
        borderColor: '#009750',
        background: 'grey',
        padding: '15px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transition: 'all 1s',
        transform: 'translate(-50%, -50%)'
    }}>
        {message}
    </div>
);


export default class Gmap extends Component {


    render() {

        console.log('props.updated: ' + this.props.updated);
        console.log('props.lastTime: ' + this.props.lastTime);

        // const message = this.state.message + this.props.coords.latitude + this.props.coords.longitude;

        // console.log(message);

        // const lat = this.props.coords.lat;
        // const lng = this.props.coords.lng;


        return (
            <div style={{position: 'absolute', height: '100%', width: '100%', bottom: 0}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyAEgsGQb9pHiOX0p8-VpZj46VMwOxg0csU'}}
                    center={{lat: this.props.coords.latitude, lng: this.props.coords.longitude}}
                    defaultZoom={11}
                    fullScreenControl={true}
                    fullScreenControlOptions={{position: 'BOTTOM_LEFT'}}>
                    <ExampleComponent
                        lat={this.props.coords.latitude}
                        lng={this.props.coords.longitude}
                        message={this.props.message + '\n' + this.props.coords.latitude + '\n' + this.props.coords.longitude + '\n' + this.props.lastTime.toLocaleTimeString()}/>
                </GoogleMapReact>
            </div>
        );
    }
}