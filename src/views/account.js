import React from 'react';
import Web3Utils from 'web3-utils';
import renderHTML from 'react-render-html';
import {Ticket721UniqueCard} from "../components/ticket721-unique-card";
import {connect} from 'vort_x-components';
import {withRouter} from 'react-router-dom'
import {Row} from 'antd';

import './account.css';

export class _Account extends React.Component {

    account;
    public_tickets = [];
    verified_tickets = [];
    constructor(props) {
        super(props);
        this.account = Web3Utils.toChecksumAddress(this.props.match.params.address);
        this.updateJdenticon();
        for (let v_idx = 0; v_idx < this.props.verified_wallet.length; ++v_idx) {
            this.verified_tickets.push(<Ticket721UniqueCard id={this.props.verified_wallet[v_idx]} key={v_idx} />)
        }
        for (let p_idx = 0; p_idx < this.props.public_wallet.length; ++p_idx) {
            this.public_tickets.push(<Ticket721UniqueCard public={true} id={this.props.public_wallet[p_idx]} key={p_idx + this.props.verified_wallet.length}/>)
        }
    }

    updateJdenticon() {
        if (jdenticon) {
            jdenticon.config = {
                lightness: {
                    color: [0.40, 0.80],
                    grayscale: [0.30, 0.90]
                },
                saturation: {
                    color: 0.50,
                    grayscale: 0.00
                },
                backColor: "#131313ff"
            };
            jdenticon();
        }
    }

    render() {
        return (
            <div style={{
                backgroundColor: '#ffffff',
                minHeight: '110%',
                width: '98%'
            }}>
                <div style={{width: '110%'}}>
                    {renderHTML('<svg data-jdenticon-value="' + this.account.toLowerCase() + '" width="45" height="45" class="profile-logo"/>')}
                    {
                        this.account
                            ?
                            <p className="account_title">{this.account}</p>
                            :
                            <p></p>
                    }
                </div>
                <div style={{
                    marginLeft: '30px'
                }}>
                    {
                        this.verified_tickets.length
                            ?
                            <div>
                                <p className="section_title">{this.verified_tickets.length} verified tickets</p>
                                <Row gutter={16}>
                                    {this.verified_tickets}
                                </Row>
                            </div>
                            :
                            <div/>
                    }
                    {
                        this.public_tickets.length
                            ?
                            <div>
                                <p className="section_title">{this.public_tickets.length} public tickets</p>
                                <Row gutter={16}>
                                    {this.public_tickets}
                                </Row>
                            </div>
                            :
                            <div/>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        public_wallet: state.csapi.public_wallet,
        verified_wallet: state.csapi.verified_wallet
    }
};

export const Account = withRouter(connect(_Account, mapStateToProps));
