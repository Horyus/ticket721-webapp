import React from 'react';
import {Map, Marker, TileLayer, Popup} from 'react-leaflet';

export class LeafletLeftMap extends React.Component {
    render() {
        return (
            <div>
                <Map style={{
                    height: window.innerHeight,
                    width: window.innerWidth * 0.25,
                    boxShadow: "3px 0px 18px rgba(0,0,0,0.30), 0px 0px 0px rgba(0,0,0,0.22)",
                    position: 'fixed',
                    float: 'left',
                    zIndex: 100
                }}
                     center={this.props.position} zoom={15}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={this.props.position}>
                        <Popup>
                            {this.props.infos.name}
                        </Popup>
                    </Marker>
                </Map>
                <div style={{
                    position: 'absolute',
                    marginLeft: '60px',
                    marginRight: '10px',
                    marginTop: '0px',
                    left: window.innerWidth * 0.25,
                    height: '200%',
                    width: (window.innerWidth * 0.5).toString() + 'px'
                }}>
                    {this.props.children}
                </div>
            </div>
        )

    }
}
