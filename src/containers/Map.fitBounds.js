//FROM https://github.com/google-map-react/google-map-react/blob/master/API.md

import fitBounds from 'google-map-react/utils';

const bounds = (latNW, lngNW, latSE, lngSE) => {
    return {
        nw: {
            lat: {latNW},
            lng: {lngNW}
        },
        se: {
            lat: {latSE},
            lng: {lngSE}
        }
    }
};

// Or

// const bounds = {
//     ne: {
//         lat: 50.01038826014866,
//         lng: -118.6525866875
//     },
//     sw: {
//         lat: 32.698335045970396,
//         lng: -92.0217273125
//     }
// };

// const size = {
//     width: 640, // Map width in pixels
//     height: 380, // Map height in pixels
// };

export const {center, zoom} = (coord1, coord2, coord3, coord4) => {
    fitBounds(bounds(coord1, coord2, coord3, coord4))
};


//SOURCE:

// import { fitBounds } from 'google-map-react/utils';
//
// const bounds = {
//     nw: {
//         lat: 50.01038826014866,
//         lng: -118.6525866875
//     },
//     se: {
//         lat: 32.698335045970396,
//         lng: -92.0217273125
//     }
// };
//
// // Or
//
// const bounds = {
//     ne: {
//         lat: 50.01038826014866,
//         lng: -118.6525866875
//     },
//     sw: {
//         lat: 32.698335045970396,
//         lng: -92.0217273125
//     }
// };
//
// const size = {
//     width: 640, // Map width in pixels
//     height: 380, // Map height in pixels
// };
//
// const {center, zoom} = fitBounds(bounds, size);