import React from 'react';

import './description.css';

export class Description extends React.Component {
    render() {
        return (
            <div className="sale_description_card" style={{
            }}>

                {
                    this.props.ipfs_infos && this.props.ipfs_infos.image ?
                        <div >
                            <img src={this.props.ipfs_infos.image} style={{
                                width: '80%',
                                marginLeft: '10%',
                                borderTopLeftRadius: '14px',
                                borderBottomRightRadius: '14px'
                            }}/>
                        </div>
                        :
                        <div/>
                }
                {
                    this.props.address_elements ?
                        <div>
                            <hr style={{width: '50%', marginBottom: '15px', marginTop: '15px', opacity: 0.2}}/>
                            <p className="sale_description_address">{this.props.address_elements.house_number}, {this.props.address_elements.road}</p>
                            <p className="sale_description_address">{this.props.address_elements.postcode}, {this.props.address_elements.city}, {this.props.address_elements.state}, {this.props.address_elements.country}</p>
                        </div>
                        :
                        null
                }
                {
                    this.props.event_begin && this.props.event_end ?
                        (<div>
                                <hr style={{width: '50%', marginBottom: '15px', marginTop: '15px', opacity: 0.2}}/>
                                <p className="sale_description_date">from <span className="light">{(new Date(parseInt(this.props.event_begin))).toDateString()} : {new Date(parseInt(this.props.event_begin)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', timeZoneName: 'short'})}</span></p>
                                <p className="sale_description_date">to <span className="light">{(new Date(parseInt(this.props.event_end))).toDateString()} : {new Date(parseInt(this.props.event_end)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', timeZoneName: 'short'})}</span></p>
                            </div>
                        )
                        :
                        null

                }
                {
                    this.props.description
                        ?
                        <div>
                            <hr style={{width: '50%', marginBottom: '15px', marginTop: '15px', opacity: 0.2}}/>
                            <h2 className="sale_description_description">{this.props.description}</h2>
                        </div>
                        :
                        null
                }

            </div>
        )
    }
}

