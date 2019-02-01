import fitBounds from 'google-map-react/utils';
import {Component} from 'react';

// //LAT
// const maxLat = Math.max(this.state.currentCoords.lat, this.state.lastCoords.lat, this.state.priorCoords.lat, this.state.initialCoords.lat);
//
// const minLat = Math.min(this.state.currentCoords.lat, this.state.lastCoords.lat, this.state.priorCoords.lat, this.state.initialCoords.lat);
//
// //LONG
// const maxLng = Math.max(this.state.currentCoords.lng, this.state.lastCoords.lng, this.state.priorCoords.lng, this.state.initialCoords.lng);
//
// const minLng = Math.min(this.state.currentCoords.lng, this.state.lastCoords.lng, this.state.priorCoords.lng, this.state.initialCoords.lng);




//
// export function FitBounds(coords) {
//
// //LAT
//     const maxLat = Math.max(coords.lat);
//     const minLat = Math.min(coords.lat);
//
// //LONG
//     const maxLng = Math.max(coords.lng);
//     const minLng = Math.min(coords.lng);
//
// //may need to change:
//     const bounds = {
//         nw: {lat: maxLat, lng: minLng},
//         se: {lat: minLat, lng: maxLng}
//     };
//
//     console.log('maxLat: ', maxLat);
//     console.log('minLat: ', minLat);
//     console.log('maxLng: ', maxLng);
//     console.log('minLng: ', minLng);
//
//
//     const size = {
//         // width: 640, // Map width in pixels
//         // height: 380, // Map height in pixels
//
//         //viewport:
//         width: window.innerWidth,
//         height: window.innerHeight,
//     };
//
//     const {center, zoom} = fitBounds(bounds, size);
//
//     console.log('zoom: ' + zoom);
//     console.log('center: ' + center.lat);
//
//
// // this.setState({zoom: zoom, center: center});
//
//     const newCenter = {
//         lat: (center.lat * .8),
//         lng: center.lng
//     };
//
//     console.log('newCenter: ', newCenter.lat);
//
//     return {newCenter, zoom};
//
// }
