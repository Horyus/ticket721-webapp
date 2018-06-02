import React from 'react';
import {Card, Divider} from 'antd';
import {connect} from 'vort_x-components';
import './index.css';
import Web3Utils from 'web3-utils';

class _Ticket721Card extends React.Component {
    render() {
        this.sale_name = this.props.name;
        if (this.props.fiat.USD) {
            return (<Card bordered={false} cover={<img alt="example"
                                                       src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
                          style={{
                              width: 300,
                              height: 300,
                              marginLeft: 15,
                              marginRight: 15,
                              marginTop: 15,
                              marginBottom: 15
                          }} className="card">
                <h2 className="card_title">{this.props.name}</h2>
                <h2 className="card_price"><span className="number_text">{Web3Utils.fromWei(new Web3Utils.BN(this.props.price), 'ether')}</span> Ξ <Divider type="vertical"/><span className="number_text">{(parseFloat(Web3Utils.fromWei(new Web3Utils.BN(this.props.price), 'ether')) * this.props.fiat.USD).toFixed(2)}</span> $</h2>
            </Card>);
        } else {
            return (<Card bordered={false} cover={<img alt="example"
                                                       src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
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
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    if (state.contracts.Ticket721[ownProps.address]) {
        return {
            fiat: ownProps.fiat,
            address: ownProps.address,
            instance: state.contracts.Ticket721[ownProps.address].instance,
            name: state.contracts.Ticket721[ownProps.address].instance.vortex.name.vortexData({}),
            price: state.contracts.Ticket721[ownProps.address].instance.vortex.getDefaultTicketPrice.vortexData({}),
        };
    } else {
        return {
            fiat: ownProps.fiat,
            address: ownProps.address
        }
    }
};

export const Ticket721Card = connect(_Ticket721Card, mapStateToProps);
