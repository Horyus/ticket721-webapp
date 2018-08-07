import React from 'react';
import {getContract, getIPFSHash, callContract} from 'vort_x';
import {connect} from 'vort_x-components';
import {LeafletLeftMap} from "../leaflet_left_map";
import {gradient_generator} from "../../helpers/gradient_generator";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {Row, Col, Table} from 'antd'
import * as QRCode from 'qrcode.react';

export default function Hello() {
    return <DayPicker />;
}

import './index.css';

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

class _TicketShowcase extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.contract === 'Ticket721Public') {
            this.gradient = gradient_generator("##" + this.props.id.toString());
        } else {
            this.gradient = gradient_generator("#" + this.props.id.toString());
        }
        this.state = {
            address: null
        }
    }

    async reverseAddress(lon, lat) {
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
        if (this.props.infos && !this.position) {
            this.position = [parseFloat(this.props.infos.latitude), parseFloat(this.props.infos.longitude)];
            this.reverseAddress(this.props.infos.longitude, this.props.infos.latitude);
        }
        const columns = [{
            title: '',
            dataIndex: 'event',
            className: 'event_title'
        }, {
            title: '',
            dataIndex: 'price',
            className: 'price'
        }];
        const data = [{
            key: '1',
            event: 'Creation',
            price: 32
        }, {
            key: '2',
            event: 'Sold',
            price: 42,
        }, {
            key: '3',
            event: 'Current Sale Price',
            price: 32
        }];
        if (this.position) {
            let modifiers;
            return (
                <div>
                    <LeafletLeftMap infos={this.props.infos} position={this.position}>
                        <Row style={{
                            width: '100%'
                        }}>
                            <Col span={10} offset={7} style={{textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>
                                <div className="ticket_id_title_box" style={{
                                    backgroundImage: this.gradient.bg
                                }}>
                                    <p className="ticket_id_title" style={{
                                        color: this.gradient.fg
                                    }}>#{this.props.id}</p>
                                </div>
                            </Col>
                        </Row>
                        <style>
                            {`
          .DayPicker-Day--selected {
            background-color: white !important;
            color: #188ae2 !important;
          }
          .DayPicker-Day--outside {
          color: #8b9898 !important;
          }
          `}
                        </style>
                        <div style={{
                            width: '100%'
                        }}>
                            <hr style={{marginTop: '20px', marginBottom: '0px', width: '119%', marginLeft: '-10%', zIndex: 10}}/>
                            <p className="contract_address">{this.props.event}</p>
                            <hr style={{marginBottom: '20px', marginTop: '0px', width: '119%', marginLeft: '-10%', zIndex: 10}}/>
                        </div>
                        <div style={{
                            textAlign: 'center',
                            marginTop: '20px',
                            width: '100%'
                        }}>
                            <style>{
                            `
                            .ticket_showcase_title {
                                font-family: "Roboto", monospace;
                                font-weight: 300;
                                font-size: 50px;
                                margin: 0;
                                padding: 0;
                                background: ${this.gradient.bg} center;
                                background-clip: text;
                                -webkit-background-clip: text;
                                color: transparent;
                            }
                            `
                            }</style>
                            <p className="ticket_showcase_title">{this.props.infos.name}</p>
                        </div>
                        <Row type="flex" justify="space-around" align="middle" style={{
                            width: '100%'
                        }}>
                            <Col span={16}>
                                <div className="data_card">
                                    {
                                        this.props.infos ?
                                            <div >
                                                <img src={this.props.infos.image} style={{width: '80%', marginLeft: '10%', borderTopLeftRadius: '14px', borderBottomRightRadius: '14px'}}/>
                                                <hr style={{width: '50%', marginBottom: '15px', marginTop: '15px', opacity: 0.2}}/>
                                            </div>
                                            :
                                            <div/>
                                    }
                                    {
                                        this.props.end && this.props.begin ?
                                            (<div>
                                                    <p className="event_date">from <span className="light">{(new Date(parseInt(this.props.begin))).toDateString()} : {new Date(parseInt(this.props.begin)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', timeZoneName: 'short'})}</span></p>
                                                    <p className="event_date">to <span className="light">{(new Date(parseInt(this.props.end))).toDateString()} : {new Date(parseInt(this.props.end)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', timeZoneName: 'short'})}</span></p>
                                                    <hr style={{width: '50%', marginBottom: '15px', marginTop: '15px', opacity: 0.2}}/>
                                                </div>
                                            )
                                            :
                                            <div/>

                                    }
                                    {
                                        this.state.address_elements ?
                                            <div>
                                                <p className="street_address">{this.state.address_elements.house_number}, {this.state.address_elements.road}</p>
                                                <p className="street_address">{this.state.address_elements.postcode}, {this.state.address_elements.city}, {this.state.address_elements.state}, {this.state.address_elements.country}</p>
                                                <hr style={{width: '50%', marginBottom: '15px', marginTop: '15px', opacity: 0.2}}/>
                                            </div>
                                            :
                                            <div/>
                                    }
                                    {
                                        this.props.infos ?
                                            <div >
                                                <p className="event_description">{this.props.infos.description}</p>
                                            </div>
                                            :
                                            <div/>
                                    }
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="data_card" style={{textAlign: 'center'}}>
                                    <QRCode value={this.props.contract + "#" + this.props.id.toString()} fgColor="#121212"/>
                                    <hr style={{width: '50%', marginBottom: '15px', marginTop: '15px', opacity: 0.2}}/>
                                    <DayPicker
                                        month={
                                            this.props.end && this.props.begin ?
                                                new Date(parseInt(this.props.begin))
                                                : undefined
                                        }
                                        fromMonth={
                                            this.props.end && this.props.begin ?
                                                new Date(parseInt(this.props.begin))
                                                : undefined
                                        }
                                        toMonth={
                                            this.props.end && this.props.begin ?
                                                new Date(parseInt(this.props.end))
                                                : undefined
                                        }
                                        selectedDays={[
                                            this.props.end && this.props.begin ?
                                                {
                                                    after: (new Date(parseInt(this.props.begin) - (24*60*60*1000))),
                                                    before: (new Date(parseInt(this.props.end) + (24*60*60*1000))),
                                                }
                                                : undefined

                                        ]}
                                        fixedWeeks
                                    />
                                    <hr style={{width: '50%', marginBottom: '15px', marginTop: '15px', opacity: 0.2}}/>
                                    <p>Download our app, follow the setup instruction and scan this QRCode to be able to access your event.</p>
                                </div>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-around" align="middle" style={{
                            width: '100%',
                            marginTop: '20px',
                            marginBottom: '40px'
                        }}>
                            <div className="data_card" style={{
                                width: '50%',
                                textAlign: 'center'
                            }}>
                                <style>{
                                    `
                                    .ant-table-small {
                                        border: 0;
                                    }
                                    .ant-table {
                                        font-family: 'Roboto', sans-serif;
                                        font-size: 40px !important;
                                    }
                                    .ant-table-row {
                                        font-size: 22px;
                                        font-weight: 300;
                                    }
                                    .ant-table-thead > tr > th {
                                        background-color: #ffffff !important;
                                    }
                                    .price {
                                        font-family: 'Roboto Mono', monospace;
                                        font-weigth: 400;
                                        background: ${this.gradient.bg} center !important;
                                        background-clip: text !important;
                                        -webkit-background-clip:        text !important;
                                        color: transparent !important;
                                        cursor: pointer;
                                    }
                                    .event_title {
                                        background-color: white !important;
                                        cursor: pointer;
                                        text-align: left;
                                    }
                                    .tx_history_title {
                                        font-family: 'Roboto', sans-serif;
                                        font-size: 22px;
                                        font-weight: 300;
                                    }
                                    `
                                }</style>
                                <p className="tx_history_title">Transaction History</p>
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    size="medium"
                                    pagination={false}
                                    indentSize={500}
                                    showHeader={false}
                                />
                            </div>
                        </Row>
                    </LeafletLeftMap>
                </div>
            )
        }
        return (
            <div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const instance = getContract(state, ownProps.contract);
    let hash;
    let event;
    let owner;
    if (instance) {
        hash = filterHash(callContract(instance, "tokenURI", ownProps.id));
        event = callContract(instance, "fromEvent", ownProps.id);
        owner = callContract(instance, "ownerOf", ownProps.id);
    }
    return {
        ...ownProps,
        infos: hash ? (getIPFSHash(state, hash) ? JSON.parse(getIPFSHash(state, hash).content.toString()) : undefined) : undefined,
        event,
        owner,
        mint_price: event ? callContract(getContract(state, "Ticket721Controller", event.toLowerCase(), true), "getMintPrice"): undefined,
        sell_price: event ? callContract(getContract(state, "Ticket721Controller", event.toLowerCase(), true), "getTicketPrice", ownProps.id): undefined,
        begin: event ? callContract(getContract(state, "Ticket721Controller", event.toLowerCase(), true), "getEventBegin"): undefined,
        end: event ? callContract(getContract(state, "Ticket721Controller", event.toLowerCase(), true), "getEventEnd"): undefined,

    }
};

export const TicketShowcase = connect(_TicketShowcase, mapStateToProps);
