import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
// import {fitBounds} from 'Map.centerZoom';


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

    constructor(props) {
        super(props);

        const currentMessage = this.props.currentMessage;
        const lastMessage = this.props.lastMessage;
        const priorMessage = this.props.priorMessage;
        const initialMessage = this.props.initialMessage;
    }

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
                    defaultZoom={7}
                    fullScreenControl={true}
                    fullScreenControlOptions={{position: 'BOTTOM_LEFT'}}
                    yesIWantToUseGoogleMapApiInternals={true}>

                    <ExampleComponent style={{opacity: '1'}}
                                      lat={this.props.currentCoords.lat}
                                      lng={this.props.currentCoords.lng}
                                      message={this.props.currentMessage + '\n' + this.props.currentCoords.lat.toFixed(4) + '\n' + this.props.currentCoords.lng.toFixed(4) + '\n' + this.props.currentCoords.workDate}/>

                    <ExampleComponent style={{opacity: '0.8'}}
                                      lat={this.props.lastCoords.lat}
                                      lng={this.props.lastCoords.lng}
                                      message={this.props.lastMessage + '\n' + this.props.lastCoords.lat.toFixed(4) + '\n' + this.props.lastCoords.lng.toFixed(4) + '\n' + this.props.lastCoords.workDate}/>

                    <ExampleComponent style={{opacity: '0.6'}}
                                      lat={this.props.priorCoords.lat}
                                      lng={this.props.priorCoords.lng}
                                      message={this.props.priorMessage + '\n' + this.props.priorCoords.lat.toFixed(4) + '\n' + this.props.priorCoords.lng.toFixed(4) + '\n' + this.props.priorCoords.workDate}/>

                    <ExampleComponent style={{opacity: 0.4}}
                                      lat={this.props.initialCoords.lat}
                                      lng={this.props.initialCoords.lng}
                                      message={this.props.initialMessage + '\n' + this.props.initialCoords.lat.toFixed(4) + '\n' + this.props.initialCoords.lng.toFixed(4) + '\n' + this.props.initialCoords.workDate}/>

                </GoogleMapReact>
            </div>
        );
    }
}