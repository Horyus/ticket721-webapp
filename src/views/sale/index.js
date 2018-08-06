import React from 'react';
import {connect} from 'vort_x-components';
import {getContract, callContract, getIPFSHash} from 'vort_x';
import {Title} from './title';
import {Minimap} from "./minimap";
import {Description} from "./description";
import {Row, Col} from 'antd';

export class _Sale extends React.Component {
    constructor(props) {
        super(props);
        this.address_fetch = false;
        this.state = {
            address: null,
            address_elements: null,
        }
    }

    async reverseAddress(lon, lat) {
        this.address_fetch = true;
        fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then((response) => {
            return response.json();
        }).then((json) => {
            console.log(json);
            this.setState({
                address: json.display_name,
                address_elements: json.address
            })
        })
    }

    render() {

        if (this.props.infos && this.props.infos.longitude && this.props.infos.latitude && !this.address_fetch)
            this.reverseAddress(this.props.infos.longitude, this.props.infos.latitude);

        console.log(this.props);

        return (
            <div style={{
                width: "98%",
                minHeight: "110%",
                backgroundColor: '#ffffff'
            }}>
                <div style={{
                    marginLeft: '30px'
                }}>
                    <Title csapi_infos={this.props.csapi_sale_infos}/>
                    <Row style={{
                        height: window.innerWidth * 0.25
                    }}>
                        <Col span={9}>
                            {
                                this.props.infos && this.props.infos.longitude && this.props.infos.latitude
                                    ?
                                    <Minimap position={[parseFloat(this.props.infos.latitude), parseFloat(this.props.infos.longitude)]}/>
                                    :
                                    <div/>
                            }
                        </Col>
                        <Col span={9}>
                            {
                                this.props.infos
                                    ?
                                    <Description
                                        description={this.props.infos.description}
                                        csapi_infos={this.props.csapi_sale_infos}
                                        address={this.state.address}
                                        address_elements={this.state.address_elements}
                                    />
                                    :
                                    <div></div>
                            }
                        </Col>
                    </Row>
                </div>
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
    const instance = getContract(state, 'Ticket721Controller', ownProps.match.params.address, true);
    const hash = filterHash(callContract(instance, 'getEventURI'));
    const content = hash ? (getIPFSHash(state, hash) ? JSON.parse(getIPFSHash(state, hash).content.toString()) : undefined) : undefined;
    return {
        ...ownProps,
        sale_contract: instance,
        infos: content,
        csapi_sale_infos: state.csapi.events.filter((elem) => {return (elem.address.toLowerCase() === ownProps.match.params.address.toLowerCase())})
    }
};

export const Sale = connect(_Sale, mapStateToProps);
