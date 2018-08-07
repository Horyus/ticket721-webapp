import './index.css';

import React from 'react';
import {connect} from 'vort_x-components';
import {getFeed, FeedType, getEvents} from 'vort_x';

import {TxBar} from "./tx";
import {Mint} from "./mint";

class _InformationFeed extends React.Component {

    constructor(props) {
        super(props);
        this.feed = [];
        this.mem = 0;
        this.pub_mint = 0;
        this.ver_mint = 0;
        this.key = 0;
        this.updateFeed(this.props);
    }

    updateFeed(newProps) {
        const _mem = this.mem;
        const _pub_mint = this.pub_mint;
        const _ver_mint = this.ver_mint;
        for (; this.mem < newProps.feed.length; ++this.mem) {
            if (newProps.feed[this.mem].action === 'NEW_TRANSACTION') {
                this.feed.unshift(<TxBar txHash={newProps.feed[this.mem].transaction_hash} key={this.key}/>)
                ++this.key;
            }
        }
        for (; this.ver_mint < newProps.verified_mint_event.length; ++this.ver_mint) {
            if ('0x' + newProps.verified_mint_event[this.ver_mint].args.topics[1].slice(26).toLowerCase() === this.props.coinbase.toLowerCase()) {
                this.feed.unshift(<Mint contract_name="Ticket721" key={this.key}/>)
                ++this.key;
            }
        }
        for (; this.pub_mint < newProps.public_mint_event.length; ++this.pub_mint) {
            if ('0x' + newProps.public_mint_event[this.pub_mint].args.topics[1].slice(26).toLowerCase() === this.props.coinbase.toLowerCase()) {
                this.feed.unshift(<Mint contract_name="Ticket721Public" key={this.key}/>)
                ++this.key;
            }
        }
        return _mem !== this.mem || _pub_mint !== this.pub_mint || _ver_mint !== this.ver_mint;
    }

    shouldComponentUpdate(newProps) {
        console.log(newProps);
        return this.updateFeed(newProps);
    }

    render() {
        return (
            <div>
                {
                    this.feed
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        coinbase: state.web3.coinbase,
        feed: getFeed(state, FeedType.Transactions),
        verified_mint_event: getEvents(state, {event_name: 'Mint', contract_name: 'Ticket721', contract_address: state.contracts.Ticket721.deployed}),
        public_mint_event: getEvents(state, {event_name: 'Mint', contract_name: 'Ticket721Public', contract_address: state.contracts.Ticket721Public.deployed}),
    }
};

export const InformationFeed = connect(_InformationFeed, mapStateToProps);
