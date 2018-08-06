import React from 'react';
import {Map, Marker, TileLayer, Popup} from 'react-leaflet';

import './minimap.css';

export class Minimap extends React.Component {
    render() {
        return (
            <div style={{
                width: '100%',
                height: '100%'
            }}>
                <Map
                    className="sale_minimap_map"
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    center={this.props.position} zoom={15}
                >
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={this.props.position}>
                        <Popup>
                        </Popup>
                    </Marker>
                </Map>
            </div>
        )

    }
}
