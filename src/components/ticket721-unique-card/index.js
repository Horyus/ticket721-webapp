import {Card} from 'antd';
import React from 'react';
import {connect} from 'vort_x-components';
import {getContract, getIPFSHash} from 'vort_x';
import Lottie from 'react-lottie';
import * as Options from './animation';
import {withRouter} from 'react-router-dom';
import {gradient_generator} from "../../helpers/gradient_generator";


import {keccak_256} from 'js-sha3';

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

import './index.css';

export class _Ticket721UniqueCard extends React.Component {
    constructor(props) {
        super(props);
        this.fetched = false;
        this.parsed = false;
        this.gradient = gradient_generator((this.props.public ? "#" : "") + "#" + this.props.id.toString());
    }


    render() {
        if (this.props.data && this.props.data.content) {
            const parsed = JSON.parse(this.props.data.content.toString());
            this.image = parsed.image;
            this.name = parsed.name;
        }
        console.log(this.props);
        if (!this.image || !this.name) {
            const lottieOptions = {
                loop: true,
                autoplay: true,
                animationData: Options
            };
            return (
                <div
                    style={{
                        width: '250',
                        height: '250',
                        margin: '15',
                        float: 'left',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
                    }}
                >
                    <Lottie
                        options={lottieOptions}
                    />
                </div>
            )
        }
        return (
            <div
                className="ticket"
                style={{
                    width: '250',
                    minHeight: '250',
                    margin: '15'
                }}
                onClick={() => {
                    this.props.history.push('/ticket/' + (this.props.public ? "public/" : "verified/") + this.props.id);
                }}>
                <img src={this.image} style={{width: '250', maxHeight: '250'}}/>
                {
                    this.name
                        ?
                        <p className="ticket_event_title">{this.name}</p>
                        :
                        <div></div>
                }
                <div style={{
                    textAlign: 'center'
                }}>
                    <p className="ticket_id" style={{
                        backgroundImage: this.gradient.bg,
                        color: this.gradient.fg
                    }}>#{this.props.id}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    if (ownProps.public) {
        return {
            ...ownProps,
            uri: getContract(state, "Ticket721Public") ? filterHash(getContract(state, "Ticket721Public").vortexMethods.tokenURI.data(ownProps.id)) : undefined,
            data: (getContract(state, "Ticket721Public")
                ?
                (filterHash(getContract(state, "Ticket721Public").vortexMethods.tokenURI.data(ownProps.id))
                    ? getIPFSHash(state, filterHash(getContract(state, "Ticket721Public").vortexMethods.tokenURI.data(ownProps.id)))
                    : undefined)
                :
                undefined)
        };
    } else {
    return {
        ...ownProps,
        uri: getContract(state, "Ticket721") ? filterHash(getContract(state, "Ticket721").vortexMethods.tokenURI.data(ownProps.id)) : undefined,
        data: (getContract(state, "Ticket721")
            ?
            (filterHash(getContract(state, "Ticket721").vortexMethods.tokenURI.data(ownProps.id))
                ? getIPFSHash(state, filterHash(getContract(state, "Ticket721").vortexMethods.tokenURI.data(ownProps.id)))
                : undefined)
            :
            undefined)
    };

    }
};

export const Ticket721UniqueCard = withRouter(connect(_Ticket721UniqueCard, mapStateToProps));
