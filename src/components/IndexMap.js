import React, {Component} from 'react';
import MapContainer from "../containers/Map.container";
import MapGeo from "../containers/Map.geo";

// ???:
// module.exports = () => {

export default class IndexMap extends Component {

    // TODO token / login => MapGeo props

    render() {
        return (
            <MapGeo/>
        );
    }
}

//             {/*<MapContainer/>*/}
