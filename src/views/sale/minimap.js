import React from 'react';
import {Map, Marker, TileLayer, Popup} from 'react-leaflet';

import './minimap.css';

export class Minimap extends React.Component {
    render() {
        return (
            <div style={{
                width: window.innerWidth * 0.25,
                height: window.innerWidth * 0.25
            }}>
                <Map
                    className="sale_minimap_map"
                    style={{
                        width: window.innerWidth * 0.25,
                        height: window.innerWidth * 0.25,
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
