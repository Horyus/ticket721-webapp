import React from 'react';
import {Card} from 'antd';
import {connect} from 'vort_x-components';
import {IPFSLoad, getContract, callContract} from 'vort_x';
import './index.css';
import Web3Utils from 'web3-utils';
import Lottie from 'react-lottie';
import * as Options from './animation';
import {withRouter} from 'react-router-dom';

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

class _Ticket721Card extends React.Component {
    constructor(props) {
        super(props);
        this.fetched = false;
        this.named = false;
        this.symboled = false;
    }

    render() {
        if (!this.fetched && this.props.infos) {
            this.props.IPFSLoad(this.props.infos);
            this.fetched = true;
        }
        if (!this.named && this.props.name) {
            this.props.onUpdate(this.props._key, this.props.name, this.props.symbol);
            this.named = true;
        }
        if (!this.symboled && this.props.symbol) {
            this.props.onUpdate(this.props._key, this.props.name, this.props.symbol);
            this.symboled = true;
        }
        if (this.props.recovered_infos) {
            try {
                const parsed = JSON.parse(this.props.recovered_infos.content.toString());
                return (<Card bordered={false} cover={<img alt="example" className="card_image" style={{height: '180px'}} src={parsed.image} onClick={() => {
                    this.props.history.push('/sale/' + this.props.address)
                }}/>}
                              style={{
                                  width: 300,
                                  height: 300,
                                  marginLeft: 15,
                                  marginRight: 15,
                                  marginTop: 15,
                                  marginBottom: 15
                              }} className="card">
                    <h2 className="card_title">{this.props.name}</h2>
                    <h2 className="card_price"><span className="number_text">{Web3Utils.fromWei(new Web3Utils.BN(this.props.price), 'ether')}</span> Ξ</h2>
                </Card>);
            } catch (e) {
                return (<div/>);
            }
        } else {
            const lottieOptions = {
                loop: true,
                autoplay: true,
                animationData: Options
            };
            return (<Card bordered={false}
                          style={{
                              width: 300,
                              height: 300,
                              marginLeft: 15,
                              marginRight: 15,
                              marginTop: 15,
                              marginBottom: 15
                          }} className="card">
                <Lottie
                    options={lottieOptions}
                />

            </Card>);

        }
    }
}

const mapStateToProps = (state, ownProps) => {
    if (ownProps.event) {
        return {
            ...ownProps,
            name: ownProps.event.name,
            price: callContract(getContract(state, "Ticket721Controller", ownProps.event.address, true), "getMintPrice"),
            infos: filterHash(ownProps.event.infos),
            recovered_infos: state.ipfs[filterHash(ownProps.event.infos)]
        };
    } else {
        return {
            ...ownProps
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        IPFSLoad: (hash) => dispatch(IPFSLoad(hash)),
    }
};

export const Ticket721Card = withRouter(connect(_Ticket721Card, mapStateToProps, mapDispatchToProps));
