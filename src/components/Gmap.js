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
        transform: 'translate(-50%, -50%)'
    }}>
        {message}
    </div>
);


export default class Gmap extends Component {

    constructor(props) {
        super(props);

        // this.setState((state, props) => ({
        //     counter: state.counter + props.increment
        // }));


        this.state = {message: 'Current coords are: '};


        // Stackoverflow:
        // state = {
        //     x: this.props.initialX,
        //     // You can even call functions and class methods:
        //     y: this.someMethod(this.props.initialY),
        // };
// OR
//         this.state = {
//             x: props.initialX
//         };
    }

    componentDidMount() {

        if (this.props.newMessage === true) {

            this.setState({message: ('updated Coords: ')});
        }
    }


    render() {

        const message = this.state.message + this.props.coords.lat.toFixed(4) + this.props.coords.lng.toFixed(4);

        console.log(message);

        const lat = this.props.coords.lat;
        const lng = this.props.coords.lng;


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
                        lat={lat}
                        lng={lng}
                        message={message}/>
                </GoogleMapReact>
            </div>
        );
    }
}