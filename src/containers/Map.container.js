// import React, {Component} from 'react';
// import Gmap from '../components/Gmap';
// import 'whatwg-fetch';
// // import {GoogleMap} from 'google-map-react';
// import 'google-map-react/utils';
// import {fitBounds} from "google-map-react/utils";
// // import {FitBounds} from './FitBounds';
// import MapGeo from './Map.geo';
//
//
// export default class MapContainer extends Component {
//
//     constructor(props) {
//         super(props);
//
//         this.state = {
//
//             // coords: MapGeo.props.coords,
//             coords: {
//                 currentCoords: {
//                     lat: 35.2222, lng: -82.0004
//                 },
//
//                 lastCoords: {
//                     lat: 35.1111, lng: -82.0003, workDate: ''
//                 },
//                 priorCoords: {
//                     lat: 35.0001, lng: -82.0002, workDate: ''
//                 },
//                 initialCoords: {
//                     lat: 35.3333, lng: -82.0001, workDate: ''
//                 },
//             }, // coords
//             LIVEupdated: false,
//             DBupdated: false,
//             newMessage: false,
//             seconds: 0,
//             zoom: 9,
//             center: {lat: 35.55953, lng: -82.5515},
//
//
//             // combine like coords:
//             currentMessage: 'searching', //todo add load spin
//             lastMessage: 'LAST coords:',
//             priorMessage: 'PRIOR coords: ',
//             initialMessage: 'INITIAL coords: ',
//         }; // this.state
//
//         // this.navigator.geolocation = this.navigator.geolocation.bind(this);
//         // this.geoLo = this.geoLo.bind(this);
//         // this.newCoords = this.newCoords.bind(this);
//         // this.livePost = this.livePost.bind(this);
//         // // this.fitBounds = this.fitBounds.bind(this);
//         // // this.toPostOrNot = this.toPostOrNot.bind(this);
//         this.getFitBounds = this.getFitBounds.bind(this);
//         this.tick = this.tick.bind(this);
//         // this.updatePos = this.updatePos.bind(this);
//
//     } // constructor
//
//     componentDidMount() {
//
//         //TODO turn back on:
//         // this.interval = setInterval(() => this.tick(), 10000); //in ms
//
// // 1. LIVE location + setState currentCoords: -----------------------------<
//
//         navigator.geolocation.getCurrentPosition((pos) => {   //once LIVE geoLoc returned:
//
//                 console.log('GEOLO live!  new lat: ', pos.coords.latitude);
//
//                 // this.newCoords(pos);
//
//                 // const newCoords = this;
//                 this.setState({
//                     coords: {
//                         currentCoords: {
//                             lat: pos.coords.latitude,
//                             lng: pos.coords.longitude,
//                             workDate: new Date().toLocaleTimeString()
//                         }
//                     }, // coords
//                     LIVEupdated: true,
//                     currentMessage: 'LIVE coords: '
//                 }); // setState
// // priorCoords: {
//                 //     lat: this.state.coords.lastCoords.lat,
//                 //     lng: this.state.coords.lastCoords.lng
//                 // },
//                 // lastCoords: {
//                 //     lat: this.state.coords.currentCoords.lat,
//                 //     lng: this.state.coords.currentCoords.lng
//                 // },
//
//                 console.log('GEOLO live!  new lat: ', pos.coords.latitude);
//
//
//                 // console.log(this.state.coords.lastCoords.lat, this.state.coords.currentCoords.lat);
//
//                 // this.setState({
//                 //     coords: {
//                 //         priorCoords: this.state.coords.lastCoords,
//                 //         lastCoords: this.state.coords.currentCoords,
//                 //         currentCoords: {
//                 //             lat: pos.coords.latitude,
//                 //             lng: pos.coords.longitude,
//                 //             workDate: new Date().toLocaleTimeString()
//                 //         }
//                 //     },
//                 //     LIVEupdated: true,
//                 //     // DBupdated: false,
//                 //     currentMessage: 'LIVE coords are: \n',
//                 // });
//
//                 // const newCoords = this.newCoords(pos);
//                 // this.setState({coords: this.newCoords(pos)});
//
//                 // this.newCoords(pos);
//
//                 // this.setState({
//                 //     priorCoords: {
//                 //         lat: this.state.coords.lastCoords.lat,
//                 //         lng: this.state.coords.lastCoords.lng
//                 //     },
//                 //     lastCoords: {
//                 //         lat: this.state.coords.currentCoords.lat,
//                 //         lng: this.state.coords.currentCoords.lng
//                 //     },
//                 //     currentCoords: {
//                 //         lat: pos.coords.latitude,
//                 //         lng: pos.coords.longitude,
//                 //         workDate: new Date().toLocaleTimeString()
//                 //     },
//                 //     LIVEupdated: true,
//                 //     currentMessage: 'LIVE coords: '
//                 // });
//
//                 // console.log(
//                 //     'post GEOLO current: ' + this.state.coords.currentCoords.lat +
//                 //     '\nlast: ' + this.state.coords.lastCoords.lat +
//                 //     '\nprior: ' + this.state.coords.priorCoords.lat +
//                 //     '\ninitial: ' + this.state.coords.initialCoords.lat
//                 // );
//
//
//                 // set currentCoords w/ live geoLoc no matter what:
//
//                 // const newCoords = {
//                 //     priorCoords: {
//                 //         lat: this.state.coords.lastCoords.lat,
//                 //         lng: this.state.coords.lastCoords.lng
//                 //     },
//                 //     lastCoords: {
//                 //         lat: this.state.coords.currentCoords.lat,
//                 //         lng: this.state.coords.currentCoords.lng
//                 //     },
//                 //     currentCoords: {
//                 //         lat: pos.coords.latitude,
//                 //         lng: pos.coords.longitude,
//                 //         workDate: new Date().toLocaleTimeString()
//                 //     }
//                 // };
//
//                 // this.livePost(this.newCoords(pos));
//
//                 // console.log(
//                 //     'GEOLO current: ' + this.state.coords.currentCoords.lat +
//                 //     '\nlast: ' + this.state.coords.lastCoords.lat +
//                 //     '\nprior: ' + this.state.coords.priorCoords.lat +
//                 //     '\ninitial: ' + this.state.coords.initialCoords.lat
//                 // );
//
//                 // const a = (pos) => {
//                 //     const freshCoords = this.newCoords(pos);
//                 //     this.setState({
//                 //             // coords: this.newCoords(pos)
//                 //             coords: freshCoords
//                 //
//                 //             // coords: {
//                 //             // priorCoords: this.state.coords.lastCoords,
//                 //             // lastCoords: this.state.coords.currentCoords,
//                 //             // currentCoords: {
//                 //             //     lat: pos.coords.latitude,
//                 //             //     lng: pos.coords.longitude,
//                 //             //     workDate: new Date().toLocaleTimeString()
//                 //             // }
//                 //             ,
//                 //             LIVEupdated:
//                 //                 true,
//                 //             currentMessage:
//                 //                 'LIVE coords are: \n',
//                 //         }
//                 //     )
//                 // }
//                 // ;
//
//                 // this.livePost(newCoords); // replaces below
//
//                 // console.log('geoLo.state.current.lat: ', this.state.coords.currentCoords.lat);
//
//                 // this.toPostOrNot(pos.coords); //push to DB?
//
//                 // return pos;
//
//             }, //end nav.geoLo pos callback
//
//
//             (err) => {
//                 console.warn(`GeoLocation /\nyour problem Error: \n(${err.code}): ${err.message}`);
//                 this.setState({
//                     currentMessage: 'GeoLocation /\n(YOUR) Error: ' + err.message,
//                     LIVEupdated: false
//                 });
//             }, //error
//
//             {
//                 enableHighAccuracy: true,
//                 timeout:
//                     10000,
//                 maximumAge:
//                     0
//             } //option
//
//         ); //end NAV.geoLO
//
//
//         //TODO
//         // this.watchID = navigator.geolocation.watchPosition((position) => {
//         //     console.log(position);
//         //     this.setState({currentRegion: {
//         //             latitude: position.coords.latitude,
//         //             longitude: position.coords.longitude,
//         //             latitudeDelta: LATITUDE_DELTA,
//         //             longitudeDelta: LONGITUDE_DELTA,
//         //         }});
//
//
//         // try {
//         //     this.geoLo()
//         // } catch {
//         //     console.log('no geoLo');
//         // }
//
//         // console.log(
//         //     'pre GEOLO current: ' + this.state.coords.currentCoords.lat +
//         //     '\nlast: ' + this.state.coords.lastCoords.lat +
//         //     '\nprior: ' + this.state.coords.priorCoords.lat +
//         //     '\ninitial: ' + this.state.coords.initialCoords.lat
//         // );
//
//
//         // navigator.geolocation.getCurrentPosition((pos) => {   //once LIVE geoLoc returned:
//         //
//         //         console.log('GEOLO live!  new lat: ', pos.coords.latitude);
//         //
//         //         // console.log(this.state.coords.lastCoords.lat, this.state.coords.currentCoords.lat);
//         //
//         //         // this.setState({
//         //         //     coords: {
//         //         //         priorCoords: this.state.coords.lastCoords,
//         //         //         lastCoords: this.state.coords.currentCoords,
//         //         //         currentCoords: {
//         //         //             lat: pos.coords.latitude,
//         //         //             lng: pos.coords.longitude,
//         //         //             workDate: new Date().toLocaleTimeString()
//         //         //         }
//         //         //     },
//         //         //     LIVEupdated: true,
//         //         //     // DBupdated: false,
//         //         //     currentMessage: 'LIVE coords are: \n',
//         //         // });
//         //
//         //         // const newCoords = this.newCoords(pos);
//         //         // this.setState({coords: this.newCoords(pos)});
//         //
//         //         // this.newCoords(pos);
//         //
//         //         // this.setState({
//         //         //     priorCoords: {
//         //         //         lat: this.state.coords.lastCoords.lat,
//         //         //         lng: this.state.coords.lastCoords.lng
//         //         //     },
//         //         //     lastCoords: {
//         //         //         lat: this.state.coords.currentCoords.lat,
//         //         //         lng: this.state.coords.currentCoords.lng
//         //         //     },
//         //         //     currentCoords: {
//         //         //         lat: pos.coords.latitude,
//         //         //         lng: pos.coords.longitude,
//         //         //         workDate: new Date().toLocaleTimeString()
//         //         //     },
//         //         //     LIVEupdated: true,
//         //         //     currentMessage: 'LIVE coords: '
//         //         // });
//         //
//         //         // this.setState({
//         //         //     coords: newCoords
//         //         //     //         coords: {
//         //         //     //             priorCoords: this.state.coords.lastCoords,
//         //         //     //             lastCoords: this.state.coords.currentCoords,
//         //         //     //             currentCoords: {
//         //         //     //                 lat: pos.coords.latitude,
//         //         //     //                 lng: pos.coords.longitude,
//         //         //     //                 workDate: new Date().toLocaleTimeString()
//         //         //     //             }
//         //         //     //             ,
//         //         //     //             LIVEupdated:
//         //         //     //                 true,
//         //         //     //             currentMessage:
//         //         //     //                 'LIVE coords are: \n',
//         //         //     //         }
//         //         // });
//         //
//         //         // console.log(
//         //         //     'post GEOLO current: ' + this.state.coords.currentCoords.lat +
//         //         //     '\nlast: ' + this.state.coords.lastCoords.lat +
//         //         //     '\nprior: ' + this.state.coords.priorCoords.lat +
//         //         //     '\ninitial: ' + this.state.coords.initialCoords.lat
//         //         // );
//         //
//         //
//         //         // set currentCoords w/ live geoLoc no matter what:
//         //
//         //
//         //         // this.livePost(this.newCoords(pos));
//         //
//         //         // console.log(
//         //         //     'GEOLO current: ' + this.state.coords.currentCoords.lat +
//         //         //     '\nlast: ' + this.state.coords.lastCoords.lat +
//         //         //     '\nprior: ' + this.state.coords.priorCoords.lat +
//         //         //     '\ninitial: ' + this.state.coords.initialCoords.lat
//         //         // );
//         //
//         //         // const a = (pos) => {
//         //         //     const freshCoords = this.newCoords(pos);
//         //         //     this.setState({
//         //         //             // coords: this.newCoords(pos)
//         //         //             coords: freshCoords
//         //         //
//         //         //             // coords: {
//         //         //             // priorCoords: this.state.coords.lastCoords,
//         //         //             // lastCoords: this.state.coords.currentCoords,
//         //         //             // currentCoords: {
//         //         //             //     lat: pos.coords.latitude,
//         //         //             //     lng: pos.coords.longitude,
//         //         //             //     workDate: new Date().toLocaleTimeString()
//         //         //             // }
//         //         //             ,
//         //         //             LIVEupdated:
//         //         //                 true,
//         //         //             currentMessage:
//         //         //                 'LIVE coords are: \n',
//         //         //         }
//         //         //     )
//         //         // }
//         //         // ;
//         //
//         //         // this.livePost(newCoords); // replaces below
//         //
//         //         // console.log('geoLo.state.current.lat: ', this.state.coords.currentCoords.lat);
//         //
//         //         // this.toPostOrNot(pos.coords); //push to DB?
//         //
//         //         // return pos;
//         //     }, //end nav.geoLo pos callback
//         //
//         //
//         //     (err) => {
//         //         console.warn(`GeoLocation /\nyour problem Error: \n(${err.code}): ${err.message}`);
//         //         this.setState({
//         //             currentMessage: 'GeoLocation /\n(YOUR) Error: ' + err.message,
//         //             LIVEupdated: false
//         //         });
//         //     }, //error
//         //
//         //     {
//         //         // enableHighAccuracy: true,
//         //         timeout:
//         //             10000,
//         //         maximumAge:
//         //             0
//         //     } //option
//         //
//         // ); //end NAV.geoLO
//
//         // const pos = this.geoLo();
//         // console.log('compDidMount: ', pos.coords.latitude);
//         // this.newCoords(this.geoLo());
//
//         // this.setState({
//         //     priorCoords: {
//         //         lat: this.state.coords.lastCoords.lat,
//         //         lng: this.state.coords.lastCoords.lng
//         //     },
//         //     lastCoords: {
//         //         lat: this.state.coords.currentCoords.lat,
//         //         lng: this.state.coords.currentCoords.lng
//         //     },
//         //     currentCoords: {
//         //         lat: this.geoLo.coords.latitude,
//         //         lng: this.geoLo.coords.longitude,
//         //         workDate: new Date().toLocaleTimeString()
//         //     },
//         //     LIVEupdated: true,
//         //     currentMessage: 'LIVE coords: '
//         // });
//
//
// // // 2. RETRIEVE latest Server data: -----------------------------<
// // //  (ASYCrously:)
// //
// //         window
// //             .fetch(
// //                 'http://localhost:1235/api/coords', {
// //                     headers: {
// //                         'Access-Control-Allow-Origin': '*',
// //                         // 'Vary': 'Origin', // for specific URLs @ dif IPs
// //                         'Accept': 'application/json',
// //                         'Content-Type': 'application/json'
// //                     },
// //                     credentials: "same-origin",
// //                     reqDate: new Date()
// //
// //                     // mode: "no-cors" //careful with use
// //                 }
// //             )
// //             .then(res => {
// //                 console.log('DB status code: ' + res.status); // 200 if good
// //                 return res.json()
// //             })
// //
// //
// //             .then(json => {
// //                     console.log('priorCoords.lat from DB:', json.priorCoords.lat);
// //                     // this.setState({
// //                     //     priorCoords: json.priorCoords,
// //                     //     lastCoords: json.lastCoords,
// //                     //     // currentCoords: json.currentCoords,
// //                     //     // currentCoords: priorCoords,
// //                     //     DBupdated: true,
// //                     //     currentMessage: 'RETRIEVED coords are: \n',
// //                     //     lastMessage: 'RETRIEVED coords are: \n'
// //                     // }); // setState
// //
// //                     this.setState({
// //                         DBupdated: true
// //                     });
// //
// //                     this.toPostOrNot(json.coords)
// //
// //                 }
// //             )
// //
// //             // from original FETCH
// //             .catch(error => {
// //                 console
// //                     .log(
// //                         'Coords NOT FETCHED from DB: ', error);
// //                 this.setState({
// //                     DBupdated: false
// //                 })
// //             });
// //         // } //  IF
//
//         // return null;
//     } //   componentDidMount
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//
//         // this.getFitBounds();
//
//
//         // console.log('client UPDATED');
//
//         // navigator.geolocation.getCurrentPosition((pos) => {
//         //         console.log('pos ' + pos.coords.latitude + 'prevState: ' + prevState.coords.latitude);
//         //
//         //         console.log();
//         //         if (pos.coords.latitude !== prevState.coords.latitude || pos.coords.longitude !== prevState.coords.longitude) {
//         //             this.setState({coords: pos.coords, lastTime: new Date()});
//         //             console.log('UPDATE x2: ' + pos.coords.latitude); //leave here to verify call
//         //
//         //         } else {
//         //             // this.setState({lastTime: new Date()});
//         //             console.log('NO new coords @ ' + new Date().toLocaleTimeString()); //leave here to verify call
//         //         }
//         //     },
//         //
//         //     (err) => {
//         //         console.warn(`GeoLocationError: (${err.code}): ${err.message}`);
//         //         this.setState({message: 'GeoLocationError: ' + err.message});
//         //
//         //     }, {
//         //         enableHighAccuracy: true,
//         //         timeout:
//         //             60000,
//         //         maximumAge:
//         //             0
//         //     }
//         // )
//
//     } //Did Update
//
//     componentWillUnmount() {
//         clearInterval(this.interval);
//     }
//
//     // toPostOrNot(IFcoords) {
//     //
//     //     console.log(
//     //         'TOPOSTORNOTcurrent: ' + this.state.coords.currentCoords.lat +
//     //         '\nlast: ' + this.state.coords.lastCoords.lat +
//     //         '\nprior: ' + this.state.coords.priorCoords.lat +
//     //         '\ninitial: ' + this.state.coords.initialCoords.lat
//     //     );
//     //     //todo TRY CATCH
//     //
//     //     // 3. POST currentCoords or not: -----------------------------<
//     //
//     //     // 3a. GEOLO ok, DB no:
//     //
//     //     if (this.state.LIVEupdated !== false && this.state.DBupdated !== true) {
//     //
//     //         const LIVEcoords = IFcoords;
//     //
//     //         console.log('toPostorNot.pos.lat: ', LIVEcoords.latitude); //OK
//     //
//     //         //so update CURRENT pronto:
//     //         // this.setState({
//     //         //     coords: {
//     //         //         priorCoords: this.state.coords.lastCoords,
//     //         //         lastCoords: this.state.coords.currentCoords,
//     //         //         currentCoords: {
//     //         //             lat: LIVEcoords.latitude,
//     //         //             lng: LIVEcoords.longitude,
//     //         //             workDate: new Date().toLocaleTimeString()
//     //         //         },
//     //         //     }
//     //         // });
//     //
//     //         //3b. GEO no, DB ok
//     //     } else if (this.state.DBupdated !== false && this.state.LIVEupdated !== true
//     //     ) {
//     //
//     //         const DBcoords = IFcoords;
//     //
//     //         console.log('toPostorNot.currentCoords.lat: ' + this.state.coords.currentCoords.lat);
//     //
//     //         if (DBcoords.lastCoords !== this.state.coords.lastCoords) { //if need to update CURRENT & DB
//     //             // if (this.state.currentCoords !== this.state.lastCoords) {
//     //
//     //             //so update CURRENT pronto:
//     //             this.setState({
//     //                 coords: {
//     //                     priorCoords: this.state.coords.lastCoords,
//     //                     lastCoords: {
//     //                         lat: DBcoords.lastCoords.lat,
//     //                         lng: DBcoords.lastCoords.lng,
//     //                         workDate: new Date().toLocaleTimeString()
//     //                     },
//     //                 }
//     //             });
//     //
//     //             console.log('coords different, updating DB...');
//     //
//     //             // if yes POST:
//     //             window.fetch('http://localhost:1235/api/coords', {
//     //                 method: 'POST',
//     //                 headers: {
//     //                     'Content-Type': 'application/json',
//     //                     'Accept': 'application/json',
//     //                     'Access-Control-Allow-Origin': '*',
//     //                     // 'Vary': 'Origin', // for specific URLs @ dif IPs
//     //                 },
//     //                 body: JSON.stringify({
//     //                     currentCoords: this.state.currentCoords,
//     //                     // login: 'hubot',
//     //                 }),
//     //                 mode: 'no-cors', //TODO: turn off
//     //                 credentials: "same-origin"
//     //             })
//     //                 .then(res => res.json)
//     //                 .then(json => {
//     //                     console.log('DB updated' + json);
//     //                     // this.getFitBounds();
//     //
//     //
//     //                 })
//     //
//     //                 // from POST req
//     //                 .catch(error => console.log('Coords NOT POSTED to DB: ' + error));
//     //
//     //             // console.log('UPDATE state.coords.lat: ' + this.state.coords.latitude) //leave here
//     //
//     //         } // END if
//     //         else {
//     //             console.log('Coords NOT updated as Last = Current')
//     //         }
//     //
//     //         // }//  3. IF (to POST)
//     //     } //   ELSE IF
//     //
//     //     else if (this.state.DBupdated !== false && this.state.LIVEupdated !== false) {  // GEO & DB ok
//     //
//     //         this.setState({
//     //             LIVEupdated: true,
//     //             DBupdated: true
//     //         });
//     //     }
//     //
//     // }   //toPOSTorNOT
//
//
//     //     console.log(
//     //         'pre GEOLO current: ' + this.state.coords.currentCoords.lat +
//     //         '\nlast: ' + this.state.coords.lastCoords.lat +
//     //         '\nprior: ' + this.state.coords.priorCoords.lat +
//     //         '\ninitial: ' + this.state.coords.initialCoords.lat
//     //     );
//     //
//     //     // return navigator.geolocation.getCurrentPosition((pos) => {   //once LIVE geoLoc returned:
//     //     //
//     //     //         console.log('GEOLO live!  new lat: ', pos.coords.latitude);
//     //     //
//     //     //         // this.newCoords(pos);
//     //     //
//     //     //         this.setState({
//     //     //             coords: {
//     //     //                 priorCoords: {
//     //     //                     lat: this.state.coords.lastCoords.lat,
//     //     //                     lng: this.state.coords.lastCoords.lng
//     //     //                 },
//     //     //                 lastCoords: {
//     //     //                     lat: this.state.coords.currentCoords.lat,
//     //     //                     lng: this.state.coords.currentCoords.lng
//     //     //                 },
//     //     //                 currentCoords: {
//     //     //                     lat: pos.coords.latitude,
//     //     //                     lng: pos.coords.longitude,
//     //     //                     workDate: new Date().toLocaleTimeString()
//     //     //                 },
//     //     //                 LIVEupdated: true,
//     //     //                 currentMessage: 'LIVE coords: '
//     //     //             } // coords
//     //     //         }); // setState
//     //     //
//     //     //         // console.log(this.state.coords.lastCoords.lat, this.state.coords.currentCoords.lat);
//     //     //
//     //     //         // this.setState({
//     //     //         //     coords: {
//     //     //         //         priorCoords: this.state.coords.lastCoords,
//     //     //         //         lastCoords: this.state.coords.currentCoords,
//     //     //         //         currentCoords: {
//     //     //         //             lat: pos.coords.latitude,
//     //     //         //             lng: pos.coords.longitude,
//     //     //         //             workDate: new Date().toLocaleTimeString()
//     //     //         //         }
//     //     //         //     },
//     //     //         //     LIVEupdated: true,
//     //     //         //     // DBupdated: false,
//     //     //         //     currentMessage: 'LIVE coords are: \n',
//     //     //         // });
//     //     //
//     //     //         // const newCoords = this.newCoords(pos);
//     //     //         // this.setState({coords: this.newCoords(pos)});
//     //     //
//     //     //         // this.newCoords(pos);
//     //     //
//     //     //         // this.setState({
//     //     //         //     priorCoords: {
//     //     //         //         lat: this.state.coords.lastCoords.lat,
//     //     //         //         lng: this.state.coords.lastCoords.lng
//     //     //         //     },
//     //     //         //     lastCoords: {
//     //     //         //         lat: this.state.coords.currentCoords.lat,
//     //     //         //         lng: this.state.coords.currentCoords.lng
//     //     //         //     },
//     //     //         //     currentCoords: {
//     //     //         //         lat: pos.coords.latitude,
//     //     //         //         lng: pos.coords.longitude,
//     //     //         //         workDate: new Date().toLocaleTimeString()
//     //     //         //     },
//     //     //         //     LIVEupdated: true,
//     //     //         //     currentMessage: 'LIVE coords: '
//     //     //         // });
//     //     //
//     //     //         // console.log(
//     //     //         //     'post GEOLO current: ' + this.state.coords.currentCoords.lat +
//     //     //         //     '\nlast: ' + this.state.coords.lastCoords.lat +
//     //     //         //     '\nprior: ' + this.state.coords.priorCoords.lat +
//     //     //         //     '\ninitial: ' + this.state.coords.initialCoords.lat
//     //     //         // );
//     //     //
//     //     //
//     //     //         // set currentCoords w/ live geoLoc no matter what:
//     //     //
//     //     //         // const newCoords = {
//     //     //         //     priorCoords: {
//     //     //         //         lat: this.state.coords.lastCoords.lat,
//     //     //         //         lng: this.state.coords.lastCoords.lng
//     //     //         //     },
//     //     //         //     lastCoords: {
//     //     //         //         lat: this.state.coords.currentCoords.lat,
//     //     //         //         lng: this.state.coords.currentCoords.lng
//     //     //         //     },
//     //     //         //     currentCoords: {
//     //     //         //         lat: pos.coords.latitude,
//     //     //         //         lng: pos.coords.longitude,
//     //     //         //         workDate: new Date().toLocaleTimeString()
//     //     //         //     }
//     //     //         // };
//     //     //
//     //     //         // this.livePost(this.newCoords(pos));
//     //     //
//     //     //         // console.log(
//     //     //         //     'GEOLO current: ' + this.state.coords.currentCoords.lat +
//     //     //         //     '\nlast: ' + this.state.coords.lastCoords.lat +
//     //     //         //     '\nprior: ' + this.state.coords.priorCoords.lat +
//     //     //         //     '\ninitial: ' + this.state.coords.initialCoords.lat
//     //     //         // );
//     //     //
//     //     //         // const a = (pos) => {
//     //     //         //     const freshCoords = this.newCoords(pos);
//     //     //         //     this.setState({
//     //     //         //             // coords: this.newCoords(pos)
//     //     //         //             coords: freshCoords
//     //     //         //
//     //     //         //             // coords: {
//     //     //         //             // priorCoords: this.state.coords.lastCoords,
//     //     //         //             // lastCoords: this.state.coords.currentCoords,
//     //     //         //             // currentCoords: {
//     //     //         //             //     lat: pos.coords.latitude,
//     //     //         //             //     lng: pos.coords.longitude,
//     //     //         //             //     workDate: new Date().toLocaleTimeString()
//     //     //         //             // }
//     //     //         //             ,
//     //     //         //             LIVEupdated:
//     //     //         //                 true,
//     //     //         //             currentMessage:
//     //     //         //                 'LIVE coords are: \n',
//     //     //         //         }
//     //     //         //     )
//     //     //         // }
//     //     //         // ;
//     //     //
//     //     //         // this.livePost(newCoords); // replaces below
//     //     //
//     //     //         // console.log('geoLo.state.current.lat: ', this.state.coords.currentCoords.lat);
//     //     //
//     //     //         // this.toPostOrNot(pos.coords); //push to DB?
//     //     //
//     //     //         // return pos;
//     //     //
//     //     //     }, //end nav.geoLo pos callback
//     //     //
//     //     //
//     //     //     (err) => {
//     //     //         console.warn(`GeoLocation /\nyour problem Error: \n(${err.code}): ${err.message}`);
//     //     //         this.setState({
//     //     //             currentMessage: 'GeoLocation /\n(YOUR) Error: ' + err.message,
//     //     //             LIVEupdated: false
//     //     //         });
//     //     //     }, //error
//     //     //
//     //     //     {
//     //     //         // enableHighAccuracy: true,
//     //     //         timeout:
//     //     //             10000,
//     //     //         maximumAge:
//     //     //             0
//     //     //     } //option
//     //     //
//     //     // ); //end NAV.geoLO
//     // }
//     //
//     // // newCoords(pos) {
//     // //     if (pos.coords.latitude !== this.state.coords.currentCoords.lat || pos.coords.longitude !== this.state.coords.currentCoords.lng) {
//     // //         const newCoords = { //don't use .coords
//     // //             priorCoords: {
//     // //                 lat: this.state.coords.lastCoords.lat,
//     // //                 lng: this.state.coords.lastCoords.lng
//     // //             },
//     // //             lastCoords: {
//     // //                 lat: this.state.coords.currentCoords.lat,
//     // //                 lng: this.state.coords.currentCoords.lng
//     // //             },
//     // //             currentCoords: {
//     // //                 lat: pos.coords.latitude,
//     // //                 lng: pos.coords.longitude,
//     // //                 workDate: new Date().toLocaleTimeString()
//     // //             }
//     // //         }; // newCoords
//     // //         // return newCoords;
//     // //         // console.log('pre newCoords: ', this.state.coords.currentCoords.lat);
//     // //         // this.setState({coords: newCoords});
//     // //         console.log('returning newCoords...');
//     // //         return newCoords;
//     // //         // }; //return
//     // //         // })
//     // //     } // IF func
//     // //     else {
//     // //         console.log('coords NOT updated as pos.lat == current.lat');
//     // //         return this.state.coords;
//     // //     }
//     // // } //newCoords
//     //
//
//     // newCoords(pos) {
//     //     this.setState({
//     //         coords: {
//     //             // priorCoords: {
//     //             //     lat: this.state.coords.lastCoords.lat,
//     //             //     lng: this.state.coords.lastCoords.lng
//     //             // },
//     //             // lastCoords: {
//     //             //     lat: this.state.coords.currentCoords.lat,
//     //             //     lng: this.state.coords.currentCoords.lng
//     //             // },
//     //             // currentCoords: {
//     //             //     lat: pos.coords.latitude,
//     //             //     lng: pos.coords.longitude,
//     //             //     workDate: new Date().toLocaleTimeString()
//     //             // },
//     //             currentCoords: pos.coords
//     //         }, //coords
//     //         LIVEupdated: true,
//     //         currentMessage: 'LIVE coords: '
//     //     }); //setState
//     // } // newCoords
//
// // livePost(newCoords) {
// //
// //     console.log(
// //         'pre GEOLO current: ' + this.state.coords.currentCoords.lat +
// //         '\nlast: ' + this.state.coords.lastCoords.lat +
// //         '\nprior: ' + this.state.coords.priorCoords.lat +
// //         '\ninitial: ' + this.state.coords.initialCoords.lat
// //     );
// //
// //     this.setState({
// //             coords: newCoords
// //             // coords: {
// //             // priorCoords: this.state.coords.lastCoords,
// //             // lastCoords: this.state.coords.currentCoords,
// //             // currentCoords: {
// //             //     lat: pos.coords.latitude,
// //             //     lng: pos.coords.longitude,
// //             //     workDate: new Date().toLocaleTimeString()
// //             // }
// //             ,
// //             LIVEupdated:
// //                 true,
// //             currentMessage:
// //                 'LIVE coords are: \n',
// //         }
// //     )
// //     ;
// //
// //     console
// //         .log(
// //             'post GEOLO current: '
// //             +
// //             this
// //                 .state
// //                 .coords
// //                 .currentCoords
// //                 .lat
// //             +
// //             '\nlast: '
// //             +
// //             this
// //                 .state
// //                 .coords
// //                 .lastCoords
// //                 .lat
// //             +
// //             '\nprior: '
// //             +
// //             this
// //                 .state
// //                 .coords
// //                 .priorCoords
// //                 .lat
// //             +
// //             '\ninitial: '
// //             +
// //             this
// //                 .state
// //                 .coords
// //                 .initialCoords
// //                 .lat
// //         )
// //     ;
// // }
//
//     getFitBounds() {
//
//         // console.log('GETFITBOUNDS current: ' + this.state.coords.currentCoords.lat +
//         //     '\nlast: ' + this.state.coords.lastCoords.lat +
//         //     '\nprior: ' + this.state.coords.priorCoords.lat +
//         //     '\ninitial: ' + this.state.coords.initialCoords.lat);
//
//         //LAT
//         const maxLat = Math.max(this.state.coords.currentCoords.lat, this.state.coords.lastCoords.lat, this.state.coords.priorCoords.lat, this.state.coords.initialCoords.lat);
//         const minLat = Math.min(this.state.coords.currentCoords.lat, this.state.coords.lastCoords.lat, this.state.coords.priorCoords.lat, this.state.coords.initialCoords.lat);
//         //LONG
//         const maxLng = Math.max(this.state.coords.currentCoords.lng, this.state.coords.lastCoords.lng, this.state.coords.priorCoords.lng, this.state.coords.initialCoords.lng);
//         const minLng = Math.min(this.state.coords.currentCoords.lng, this.state.coords.lastCoords.lng, this.state.coords.priorCoords.lng, this.state.coords.initialCoords.lng);
//
//         //may need to change:
//         const bounds = {
//
//             ne: {lat: maxLat, lng: maxLng}, //long is -
//             sw: {lat: minLat, lng: minLng},
//
//             // nw: {lat: maxLat, lng: minLng},
//             // se: {lat: minLat, lng: maxLng},
//
//         };
//
//         // console.log('maxLat: ', maxLat);
//         // console.log('minLat: ', minLat);
//         // console.log('maxLng: ', maxLng);
//         // console.log('minLng: ', minLng);
//
//         const size = {
//             // width: 640, // Map width in pixels
//             // height: 380, // Map height in pixels
//
//             //viewport:
//             width: window.innerWidth,
//             height: window.innerHeight,
//         };
//         // console.log('size.heaight: ', size.height);
//
//         const {center, zoom} = fitBounds(bounds, size);
//
//         // console.log('zoom: ' + zoom);
//         // console.log('center.lat: ' + center.lat);
//         // console.log('center.lng: ' + center.lng);
//
//         // this.setState({zoom: zoom, center: center});
//
//         // const newCenter = {
//         //     lat: (center.lat * .8),
//         //     lng: center.lng
//         // };
//         // console.log('newCenter: ', newCenter.lat);
//
//         // const center2 = center;
//         // center2.lat = (center2.lat * .8); //doesn't work, shorten for header
//
//         // const zoom = 9;
//
//         return {center, zoom};
//
//     }; //getFitBounds
//
//     tick() {
//         this.setState(prevState => ({
//             seconds: prevState.seconds + 1
//         }));
//     } //tick
//
//     render() {
//
//         console.log(
//             'RENDER current: ' + this.state.coords.currentCoords.lat +
//             '\nlast: ' + this.state.coords.lastCoords.lat +
//             '\nprior: ' + this.state.coords.priorCoords.lat +
//             '\ninitial: ' + this.state.coords.initialCoords.lat
//         );
//
//         // const {center, zoom} = this.getFitBounds();
//         const {center, zoom} = this.getFitBounds();
//
//
//         console.log('LIVEupdated: ', this.state.LIVEupdated);
//         console.log('DBupdated: ', this.state.DBupdated);
//         console.log('zoom: ', zoom);
//
//
//         return (
//             <Gmap
//                 // coords={this.state.coords}
//                 currentCoords={this.state.currentCoords}
//                 lastCoords={this.state.lastCoords}
//                 priorCoords={this.state.priorCoords}
//                 initialCoords={this.state.initialCoords}
//
//                 LIVEupdated={this.state.LIVEupdated}
//                 DBupdated={this.state.DBupdated}
//                 newMessage={this.state.newMessage} //redundant
//                 seconds={0}
//
//                 center={center} //single bracket
//                 zoom={zoom} //single bracket
//                 currentMessage={this.state.currentMessage}
//                 lastMessage={this.state.lastMessage}
//                 priorMessage={this.state.priorMessage}
//                 initialMessage={this.state.initialMessage}
//
//             />
//         );
//     }
// }