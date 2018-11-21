import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';


// from: https://www.npmjs.com/package/google-map-react
// this is the 'circle' in middle of map
const ExampleComponent = ({text}) => (
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
        transform: 'translate(-50%, -50%)'
    }}>
        {text}
    </div>
);


export default class Gmap extends Component {


    render() {
        console.log('props.lat:' + this.props.coords.lat);
        return (

            <div style={{position: 'absolute', height: '100%', width: '100%', bottom: 0}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyAEgsGQb9pHiOX0p8-VpZj46VMwOxg0csU'}}
                    center={{lat: this.props.coords.lat, lng: this.props.coords.lng}}
                    defaultZoom={11}
                    fullScreenControl={true}
                    fullScreenControlOptions={{position: 'BOTTOM_LEFT'}}
                >
                    <ExampleComponent
                        lat={this.props.coords.lat}
                        lng={this.props.coords.lng}
                        text={'Current coords are: ' + this.props.coords.lat.toFixed(4) + this.props.coords.lng.toFixed(4)}/>
                </GoogleMapReact>
            </div>
        );

    }
}