import React from 'react';
import {connect} from 'vort_x-components';
import {getContract, callContract, getIPFSHash} from 'vort_x';
import {Title} from './title';
import {Minimap} from "./minimap";
import {Description} from "./description";
import {Row, Col} from 'antd';
import {BuyWidget} from "./buy_widget";

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
            this.setState({
                address: json.display_name,
                address_elements: json.address
            })
        })
    }

    render() {

        if (this.props.infos && this.props.infos.longitude && this.props.infos.latitude && !this.address_fetch)
            this.reverseAddress(this.props.infos.longitude, this.props.infos.latitude);

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
                        height: window.innerWidth * 0.25,
                        width: '100%'
                    }}
                         gutter={20}>
                        <Col span={8} style={{
                        }}>
                            {
                                this.props.infos && this.props.infos.longitude && this.props.infos.latitude
                                    ?
                                    <Minimap position={[parseFloat(this.props.infos.latitude), parseFloat(this.props.infos.longitude)]}/>
                                    :
                                    <div/>
                            }
                        </Col>
                        <Col span={10} style={{
                        }}>
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
                                    null
                            }
                        </Col>
                        <Col span={6} style={{
                        }}>
                            {
                                this.props.infos ?
                                    <BuyWidget
                                        remaining_seats={this.props.seats_left}
                                        total_seats={this.props.ticket_cap}
                                        instance={this.props.sale_contract}
                                        mint_price={this.props.mint_price}
                                    />
                                    :
                                    null
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
        csapi_sale_infos: state.csapi.events.filter((elem) => {return (elem.address.toLowerCase() === ownProps.match.params.address.toLowerCase())}),
        mint_price: callContract(instance, 'getMintPrice'),
        seats_left: callContract(instance, 'getRemainingTickets'),
        ticket_cap: callContract(instance, 'getTicketCap')
    }
};

export const Sale = connect(_Sale, mapStateToProps);
