import React, {Component} from 'react';
import MapContainer from "../containers/Map.container";
import MapGeo from "../containers/Map.geo";

// ???:
// module.exports = () => {

export default class IndexMap extends Component {

    render() {
        return (
            <MapGeo/>
        );
    }
}

//             {/*<MapContainer/>*/}