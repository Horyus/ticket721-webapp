import React from 'react';
import {getIPFSHash} from 'vort_x';
import {connect} from 'vort_x-components';

import './description.css';

class _Description extends React.Component {
    render() {
        let event_begin;
        if (this.props.csapi_infos && this.props.csapi_infos.length && this.props.csapi_infos[0].event_begin)
            event_begin = this.props.csapi_infos[0].event_begin;
        let event_end;
        if (this.props.csapi_infos && this.props.csapi_infos.length && this.props.csapi_infos[0].event_end)
            event_end = this.props.csapi_infos[0].event_end;
        console.log(this.props);
        return (
            <div className="sale_description_card" style={{
            }}>

                {
                    this.props.ipfs_infos && this.props.ipfs_infos.image ?
                        <div >
                            <img src={this.props.ipfs_infos.image} style={{
                                width: '80%',
                                marginLeft: '10%',
                                borderTopLeftRadius: '10px',
                                borderBottomRightRadius: '10px'
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
                    event_begin && event_end ?
                        (<div>
                                <hr style={{width: '50%', marginBottom: '15px', marginTop: '15px', opacity: 0.2}}/>
                                <p className="sale_description_date">from <span className="light">{(new Date(parseInt(event_begin))).toDateString()} : {new Date(parseInt(event_begin)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', timeZoneName: 'short'})}</span></p>
                                <p className="sale_description_date">to <span className="light">{(new Date(parseInt(event_end))).toDateString()} : {new Date(parseInt(event_end)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', timeZoneName: 'short'})}</span></p>
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

const IpfsGatewayRegexp = /^http(s?):\/\/(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])\/ipfs\/(Qm[a-zA-Z0-9]{44})$/;


function filterHash(uri) {
    if (!uri)
        return uri;
    let match;
    if ((match = uri.match(IpfsGatewayRegexp))) {
        return match[5];
    }
    return uri;
}

const mapStateToProps = (state, ownProps) => {
    const raw_infos = (ownProps.csapi_infos && ownProps.csapi_infos.length && ownProps.csapi_infos[0].infos) ? getIPFSHash(state, filterHash(ownProps.csapi_infos[0].infos)) : undefined;
    console.log(raw_infos);
    console.log(raw_infos.toString());
    return {
        ...ownProps,
        ipfs_infos: raw_infos && raw_infos.content ? JSON.parse(raw_infos.content.toString()) : undefined
    }
};

export const Description = connect(_Description, mapStateToProps);
