import React from 'react';
import * as Web3Util from 'web3-utils';
import {getContract, callContract} from 'vort_x';
import {connect} from 'vort_x-components';
import {Button} from 'antd';

import './buy_widget.css';

export class _BuyWidget extends React.Component {

    constructor(props) {
        super(props);
        this.buy = this.buy.bind(this);
    }

    buy() {
        if (this.props.contract_type && this.props.real_instance && this.props.mint_price) {
            this.props.real_instance.vortexMethods.buy.send({value: Web3Util.fromWei(this.props.mint_price, 'wei')});
        }
    }

    render() {
        return (
            <div className="sale_buy_card" style={{width: '100%'}}>
                {
                    this.props.remaining_seats && this.props.total_seats
                        ?
                        <div className="sale_buy_count_box">
                            <h2 className="sale_buy_count_title">Tickets Left</h2>
                            <h2 className="sale_buy_count_amount" style={{
                                marginBottom: '-20px'
                            }}>{this.props.remaining_seats}</h2>
                            <hr style={{width: '25%', marginBottom: '15px', marginTop: '15px', opacity: 0.2}}/>
                            <h2 className="sale_buy_count_amount" style={{
                                marginTop: '-20px'
                            }}
                            >{this.props.total_seats}</h2>
                        </div>
                        :
                        null
                }
                {
                    this.props.mint_price
                        ?
                        <div className="sale_buy_price_box">
                            <hr style={{width: '50%', marginBottom: '15px', marginTop: '15px', opacity: 0.2}}/>
                            <h2 className="sale_buy_price">{Web3Util.fromWei(this.props.mint_price, 'ether')} Ξ</h2>
                        </div>
                        :
                        null
                }
                {
                    this.props.instance && this.props.contract_type && this.props.real_instance
                        ?
                        <div className="sale_buy_button_box">
                            <hr style={{width: '50%', marginBottom: '15px', marginTop: '15px', opacity: 0.2}}/>
                            <Button type="primary" onClick={this.buy}>Buy Ticket</Button>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let contract_type;
    if (ownProps.instance) {
        contract_type = callContract(ownProps.instance, 'getContractType');
    }
    return {
        ...ownProps,
        contract_type,
        real_instance: contract_type ? getContract(state, contract_type, ownProps.instance._address, true) : undefined
    }
};

export const BuyWidget = connect(_BuyWidget, mapStateToProps);
