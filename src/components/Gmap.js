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

        // console.log('props.updated: ' + this.props.updated);
        // console.log('props.lastTime: ' + this.props.lastTime);

        // const message = this.state.message + this.props.coords.latitude + this.props.coords.longitude;

        // console.log(message);

        // const lat = this.props.coords.lat;
        // const lng = this.props.coords.lng;


        //use elements instead of Message:

        return (
            <div style={{position: 'absolute', height: '100%', width: '100%', bottom: 0}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyAEgsGQb9pHiOX0p8-VpZj46VMwOxg0csU'}}
                    center={this.props.currentCoords}
                    defaultZoom={11}
                    fullScreenControl={true}
                    fullScreenControlOptions={{position: 'BOTTOM_LEFT'}}
                    yesIWantToUseGoogleMapApiInternals={true}>
                    <ExampleComponent
                        lat={this.props.currentCoords.lat}
                        lng={this.props.currentCoords.lng}
                        message={this.props.message + '\n' + this.props.currentCoords.lat.toFixed(4) + '\n' + this.props.currentCoords.lng.toFixed(4) + '\n' + this.props.currentCoords.workDate}/>
                    <ExampleComponent
                        lat={this.props.priorCoords.lat}
                        lng={this.props.priorCoords.lng}
                        message={this.props.message + '\n' + this.props.currentCoords.lat.toFixed(4) + '\n' + this.props.currentCoords.lng.toFixed(4) + '\n' + this.props.currentCoords.workDate}/>
                </GoogleMapReact>
            </div>
        );
    }
}