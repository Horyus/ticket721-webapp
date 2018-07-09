import React from 'react';
import {Card} from 'antd';
import {connect} from 'vort_x-components';
import {IPFSLoad, getContract, callContract} from 'vort_x';
import './index.css';
import Web3Utils from 'web3-utils';
import Lottie from 'react-lottie';
import * as Options from './animation.json';

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
                this.image_source = "https://gateway.ipfs.io/ipfs/" + parsed.image;
                return (<Card bordered={false} cover={<img alt="example" style={{height: '180px'}} src={this.image_source}/>}
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
    if (state.contracts.Ticket721Event[ownProps.address]) {
        return {
            ...ownProps,
            instance: getContract(state, "Ticket721Event", ownProps.address),
            name: callContract(getContract(state, "Ticket721Event", ownProps.address), "name"),
            price: callContract(getContract(state, "Ticket721Event", ownProps.address), "getMintPrice"),
            infos: callContract(getContract(state, "Ticket721Event", ownProps.address), "getData"),
            recovered_infos: state.ipfs[callContract(getContract(state, "Ticket721Event", ownProps.address), "getData")]

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

export const Ticket721Card = connect(_Ticket721Card, mapStateToProps, mapDispatchToProps);
