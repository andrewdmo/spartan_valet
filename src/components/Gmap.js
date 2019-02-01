import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
// import {center, zoom} from '../containers/Map.fitBounds';


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

        return (
            <div style={{position: 'absolute', height: '100%', width: '100%', bottom: 0}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyAEgsGQb9pHiOX0p8-VpZj46VMwOxg0csU'}}
                    // center={this.props.coords.currentCoords}
                    zoom={this.props.zoom}
                    center={this.props.center}
                    defaultZoom={7}
                    fullScreenControl={true}
                    fullScreenControlOptions={{position: 'BOTTOM_LEFT'}}
                    yesIWantToUseGoogleMapApiInternals={true}>

                    <ExampleComponent style={{opacity: '1'}}
                                      lat={this.props.coords.currentCoords.lat}
                                      lng={this.props.coords.currentCoords.lng}
                                      message={this.props.currentMessage + '\n' + this.props.coords.currentCoords.lat.toFixed(4) + '\n' + this.props.coords.currentCoords.lng.toFixed(4) + '\n' + this.props.coords.currentCoords.workDate}/>

                    <ExampleComponent style={{opacity: '0.8'}}
                                      lat={this.props.coords.lastCoords.lat}
                                      lng={this.props.coords.lastCoords.lng}
                                      message={this.props.lastMessage + '\n' + this.props.coords.lastCoords.lat.toFixed(4) + '\n' + this.props.coords.lastCoords.lng.toFixed(4) + '\n' + this.props.coords.lastCoords.workDate}/>

                    <ExampleComponent style={{opacity: '0.6'}}
                                      lat={this.props.coords.priorCoords.lat}
                                      lng={this.props.coords.priorCoords.lng}
                                      message={this.props.priorMessage + '\n' + this.props.coords.priorCoords.lat.toFixed(4) + '\n' + this.props.coords.priorCoords.lng.toFixed(4) + '\n' + this.props.coords.priorCoords.workDate}/>

                    <ExampleComponent style={{opacity: 0.4}}
                                      lat={this.props.coords.initialCoords.lat}
                                      lng={this.props.coords.initialCoords.lng}
                                      message={this.props.initialMessage + '\n' + this.props.coords.initialCoords.lat.toFixed(4) + '\n' + this.props.coords.initialCoords.lng.toFixed(4) + '\n' + this.props.coords.initialCoords.workDate}/>
                </GoogleMapReact>
            </div>
        );
    }
}