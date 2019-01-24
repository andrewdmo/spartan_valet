import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

// from: https://www.npmjs.com/package/google-map-react
// this is the 'circle' in middle of map

export const ExampleComponent = ({opacity}, {message}) => (
    <div style={{
        color: 'white',
        border: '10px',
        borderColor: '#009750',
        background: 'grey',
        opacity: {opacity},
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

// export default class ExampleComponent extends Component {
//
//     render() {
//         return (
//             <div>
//                 <ExampleComponent style={{opacity: '1'}}
//                                   lat={this.props.currentCoords.lat}
//                                   lng={this.props.currentCoords.lng}
//                                   message={this.props.currentMessage + '\n' + this.props.currentCoords.lat.toFixed(4) + '\n' + this.props.currentCoords.lng.toFixed(4) + '\n' + this.props.currentCoords.workDate}/>
//
//                 <ExampleComponent style={{opacity: '0.8'}}
//                                   lat={this.props.lastCoords.lat}
//                                   lng={this.props.lastCoords.lng}
//                                   message={this.props.lastMessage + '\n' + this.props.lastCoords.lat.toFixed(4) + '\n' + this.props.lastCoords.lng.toFixed(4) + '\n' + this.props.lastCoords.workDate}/>
//
//                 <ExampleComponent style={{opacity: '0.6'}}
//                                   lat={this.props.priorCoords.lat}
//                                   lng={this.props.priorCoords.lng}
//                                   message={this.props.priorMessage + '\n' + this.props.priorCoords.lat.toFixed(4) + '\n' + this.props.priorCoords.lng.toFixed(4) + '\n' + this.props.priorCoords.workDate}/>
//
//                 <ExampleComponent style={{opacity: 0.4}}
//                                   lat={this.props.initialCoords.lat}
//                                   lng={this.props.initialCoords.lng}
//                                   message={this.props.initialMessage + '\n' + this.props.initialCoords.lat.toFixed(4) + '\n' + this.props.initialCoords.lng.toFixed(4) + '\n' + this.props.initialCoords.workDate}/>
//
//             </div>
//         );
//     }
// }