import React from 'react';
import './index.css';
import {getContract, callContract} from 'vort_x';
import {connect} from 'vort_x-components';
import {Card, Icon, Popover} from 'antd'
import renderHTML from 'react-render-html';

import {CsApiTracker} from "../csapi-tracker";
import {CsApiFetchWallets} from "../../redux/csapi/csapi.actions";

export class _ConnectionTracker extends React.Component {

    initial_fetch = false;

    componentDidUpdate() {
        if (!this.initial_fetch && this.props.public_wallet_live_count && this.props.verified_wallet_live_count && this.props.csapi.wallet_status === 'IDLE') {
            if ((parseInt(this.props.public_wallet_live_count) !== this.props.csapi.public_wallet.length)
                || (parseInt(this.props.verified_wallet_live_count) !== this.props.csapi.verified_wallet.length)) {
                this.props.fetchWallets();
            }
            this.initial_fetch = true;
        }
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
                backColor: "#393939ff"
            };
            jdenticon();
        }
    }

    render() {

        let csapi_color;
        let csapi_content;
        switch (this.props.csapi.status) {
            case 'DISCONNECTED':
                csapi_color = 'red';
                csapi_content = <div>
                    <p className="popover-text">You are not connected to the cache server</p>
                </div>;
                break ;
            case 'CONNECTED':
                csapi_color = 'green';
                csapi_content = <div>
                    <p className="popover-text">You are connected to the cache server</p>
                </div>;
                break ;
            case 'NOT_REGISTERED':
                csapi_color = 'orange';
                csapi_content = <div>
                    <p className="popover-text">You are registered in the cache server</p>
                </div>;
                break ;

            default:
                csapi_color = 'red';
                break;
        }

        let backlink_color;
        let backlink_content;
        switch(this.props.backlink.status) {
            case 'CONNECTED':
                backlink_color = 'green';
                backlink_content = <div>
                    <p className="popover-text">Backlink is properly connected</p>
                </div>;
                break;
            default:
                backlink_color = 'red';
                backlink_content = <div>
                    <p className="popover-text">Backlink is not connected</p>
                </div>;
        }

        let wallet_color;
        let wallet_icon;
        let wallet_content;
        switch (this.props.csapi.wallet_status) {
            case 'IDLE':
                wallet_color = 'green';
                wallet_icon = 'folder';
                wallet_content = <div>
                    <p className="popover-text">Personnal wallet up to date</p>
                </div>;
                break ;
            case 'NONE':
                wallet_color = 'red';
                wallet_icon = 'folder';
                wallet_content = <div>
                    <p className="popover-text">Personnal wallet not up to date</p>
                </div>;
                break ;
            case 'FETCHING':
                wallet_color = 'orange';
                wallet_icon = 'loading';
                wallet_content = <div>
                    <p className="popover-text">Updating personnal wallet</p>
                </div>;
                break ;
            default:
                wallet_color = 'red';
                wallet_icon = 'folder';
                wallet_content = <div>
                    <p className="popover-text">Personnal wallet not up to date</p>
                </div>;
        }

        let public_color = 'red';
        let public_content = <div>
            <p className="popover-text">Public Ticket registry not loaded</p>
        </div>;
        if (this.props.public_wallet_live_count) {
            public_color = 'green';
            public_content = <div>
                <p className="popover-text">Public Ticket registry loaded</p>
            </div>;
        }

        let verified_color = 'red';
        let verified_content = <div>
            <p className="popover-text">Verified Ticket registry not loaded</p>
        </div>;
        if (this.props.verified_wallet_live_count) {
            verified_color = 'green';
            verified_content = <div>
                <p className="popover-text">Verified Ticket registry loaded</p>
            </div>;
        }

        return (
            <div>
                <div className="left-div">
                    <Card className="connection-tracker">
                        <div style={{textAlign: 'center'}}>
                            <Popover placement="bottom" content={verified_content} trigger="hover">
                                <Icon type="file-text" style={{fontSize: '20px', color: verified_color, marginLeft: '5px'}}/>
                            </Popover>
                            <Popover placement="bottom" content={public_content} trigger="hover">
                                <Icon type="file-text" style={{fontSize: '20px', color: public_color, marginLeft: '5px'}}/>
                            </Popover>
                            <Popover placement="bottom" content={csapi_content} trigger="hover">
                                <Icon type="database" style={{fontSize: '20px', color: csapi_color, marginLeft: '5px'}}/>
                            </Popover>
                            <Popover placement="bottom" content={backlink_content} trigger="hover">
                                <Icon type="up-square-o" style={{fontSize: '20px', color: backlink_color, marginLeft: '5px'}}/>
                            </Popover>
                            <Popover placement="bottom" content={wallet_content} trigger="hover">
                                <Icon type={wallet_icon} style={{fontSize: '20px', color: wallet_color, marginLeft: '5px'}}/>
                            </Popover>
                        </div>
                    </Card>
                    {this.props.csapi.status === 'CONNECTED'
                        ?
                        <Card className="connection-tracker">
                            <Popover placement="right" content={<p className="popover-text">{this.props.coinbase}</p>} trigger="hover">
                            {renderHTML('<svg data-jdenticon-value="' + this.props.coinbase + '" width="35" height="35" class="profile-link"/>')}
                            </Popover>
                            <p className="profile-title">My Account</p>
                        </Card>
                        :
                        <div></div>
                    }
                    <CsApiTracker/>
                </div>
                <div className="right-div">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const public_address = Object.keys(state.contracts.Ticket721Public).filter(elem => elem !== 'artifact')[0];
    const verified_address = Object.keys(state.contracts.Ticket721).filter(elem => elem !== 'artifact')[0];
    return {
        csapi: state.csapi,
        backlink: state.backlink,
        public_wallet_live_count: public_address ? callContract(getContract(state, 'Ticket721Public', public_address), 'balanceOf', state.web3.coinbase) : undefined,
        verified_wallet_live_count: verified_address ? callContract(getContract(state, 'Ticket721', verified_address), 'balanceOf', state.web3.coinbase) : undefined,
        coinbase: state.web3.coinbase
    };
};

const  mapDispatchToProps = (dispatch) => {
    return {
        fetchWallets: () => {dispatch(CsApiFetchWallets())}
    }
};

export const ConnectionTracker = connect(_ConnectionTracker, mapStateToProps, mapDispatchToProps);
