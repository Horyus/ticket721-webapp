import React from 'react';
import './index.css';
import {getContract, callContract, getEvents} from 'vort_x';
import {connect} from 'vort_x-components';
import {InformationFeed} from "../information_feed";
import {Popover} from 'antd'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

import { Nav, NavIcon, NavText , withRR4} from 'react-sidenav';
import SvgIcon from 'react-icons-kit';

const SideNav = withRR4();

import { fileText, chevronsDown, loader, link, layers, calendar, home, user} from 'react-icons-kit/feather';

import {CsApiTracker} from "../csapi-tracker";
import {CsApiFetchWallets} from "../../redux/csapi/csapi.actions";

import styled from 'styled-components';
import {WalletFetch} from "../../redux/wallet/wallet.actions";

const SeparatorTitleContainer = styled.div`
    font-size: 14px;
    color: #AAA;
    margin: 10px 12px;
    padding: 4px 12px 2px;
`;
const SeparatorTitle = props => {
    return (
        <SeparatorTitleContainer>
            {props.children}
            <hr style={{ border: 0, borderTop: '1px solid #E5E5E5' }} />
        </SeparatorTitleContainer>
    );
};
export class _ConnectionTracker extends React.Component {

    initial_fetch = false;

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

    shouldComponentUpdate(newProps) {
        if (this.props.public_mint_events.length !== newProps.public_mint_events.length) {
            this.props.fetchWallets();
            this.props.test_fetchWallets();
        }
        else if (this.props.verified_mint_events.length !== newProps.verified_mint_events.length) {
            this.props.fetchWallets();
            this.props.test_fetchWallets();
        }
        return true;
    }

    componentDidUpdate() {
        if (!this.initial_fetch && this.props.public_wallet_live_count && this.props.verified_wallet_live_count && this.props.wallet.status === 'IDLE') {
            if ((parseInt(this.props.public_wallet_live_count) !== this.props.wallet.public_wallet.length)
                || (parseInt(this.props.verified_wallet_live_count) !== this.props.wallet.verified_wallet.length)) {
                this.props.fetchWallets();
                this.props.test_fetchWallets();
            }
            this.initial_fetch = true;
        }
        this.updateJdenticon();
    }

    componentDidMount() {
        this.updateJdenticon();
    }

    render() {

        let csapi_color;
        let csapi_content;
        switch (this.props.csapi.status) {
            case 'DISCONNECTED':
                csapi_color = 'gray';
                csapi_content = <div>
                    <p className="popover-text">you are not connected to the cache server</p>
                </div>;
                break ;
            case 'CONNECTED':
                csapi_color = 'green';
                csapi_content = <div>
                    <p className="popover-text">you are connected to the cache server</p>
                </div>;
                break ;
            case 'NOT_REGISTERED':
                csapi_color = 'orange';
                csapi_content = <div>
                    <p className="popover-text">you are not registered in the cache server</p>
                </div>;
                break ;

            default:
                csapi_color = 'gray';
                break;
        }

        let backlink_color;
        let backlink_content;
        switch(this.props.backlink.status) {
            case 'CONNECTED':
                backlink_color = 'green';
                backlink_content = <div>
                    <p className="popover-text">backlink is properly connected</p>
                </div>;
                break;
            default:
                backlink_color = 'gray';
                backlink_content = <div>
                    <p className="popover-text">backlink is not connected</p>
                </div>;
        }

        let wallet_color;
        let wallet_icon;
        let wallet_content;
        switch (this.props.wallet.status) {
            case 'IDLE':
                wallet_color = 'green';
                wallet_icon = layers;
                wallet_content = <div>
                    <p className="popover-text">personnal wallet up to date</p>
                </div>;
                break ;
            case 'FETCHING':
                wallet_color = 'orange';
                wallet_icon = loader;
                wallet_content = <div>
                    <p className="popover-text">updating personnal wallet</p>
                </div>;
                break ;
            default:
                wallet_color = 'gray';
                wallet_icon = layers;
                wallet_content = <div>
                    <p className="popover-text">personnal wallet not up to date</p>
                </div>;
        }

        let event_color;
        let event_icon;
        let event_content;
        switch (this.props.csapi.event_status) {
            case 'IDLE':
                event_color = 'green';
                event_icon = 'calendar';
                event_content = <div>
                    <p className="popover-text">events listing up to date</p>
                </div>;
                break ;
            case 'NONE':
                event_color = 'gray';
                event_icon = 'calendar';
                event_content = <div>
                    <p className="popover-text">events listing not up to date</p>
                </div>;
                break ;
            case 'FETCHING':
                event_color = 'orange';
                event_icon = 'loading';
                event_content = <div>
                    <p className="popover-text">updating events listing</p>
                </div>;
                break ;
            default:
                event_color = 'gray';
                event_icon = 'calendar';
                event_content = <div>
                    <p className="popover-text">events listing not up to date</p>
                </div>;
        }

        let public_color = 'gray';
        let public_content = <div>
            <p className="popover-text">public ticket registry not loaded</p>
        </div>;
        if (this.props.public_wallet_live_count) {
            public_color = 'green';
            public_content = <div>
                <p className="popover-text">public ticket registry loaded</p>
            </div>;
        }

        let verified_color = 'gray';
        let verified_content = <div>
            <p className="popover-text">verified ticket registry not loaded</p>
        </div>;
        if (this.props.verified_wallet_live_count) {
            verified_color = 'green';
            verified_content = <div>
                <p className="popover-text">verified ticket registry loaded</p>
            </div>;
        }

        const account_id = `account/${this.props.coinbase}`;

        return (
            <div>
                <div className="left-div">
                    <div style={{background: '#ffffff', color: '#202020', width: '99%', height: '80%', float: 'left'}}>

                        <SideNav highlightColor='#fdfdfd' highlightBgColor='#202020' defaultSelected=''>

                            <SeparatorTitle>
                                <div style={{
                                    textAlign: 'center'
                                }}>status</div>
                            </SeparatorTitle>
                            <div className="ticket721_status_container">

                                <Popover title="verified registry status" placement="bottom" content={verified_content} trigger="hover">
                                    <SvgIcon className="ticket721_status_logo" size={20} icon={fileText} style={{color: verified_color}}/>
                                </Popover>
                                <Popover title="public registry status" placement="bottom" content={public_content} trigger="hover">
                                    <SvgIcon className="ticket721_status_logo" size={20} icon={fileText} style={{color: public_color}}/>
                                </Popover>
                                <Popover title="cache server status" placement="bottom" content={csapi_content} trigger="hover">
                                    <SvgIcon className="ticket721_status_logo" size={20} icon={chevronsDown} style={{color: csapi_color}}/>
                                </Popover>
                                <Popover title="backlink status" placement="bottom" content={backlink_content} trigger="hover">
                                    <SvgIcon className="ticket721_status_logo" size={20} icon={link} style={{color: backlink_color}}/>
                                </Popover>
                                <Popover title="wallet content status" placement="bottom" content={wallet_content} trigger="hover">
                                    <SvgIcon className="ticket721_status_logo" size={20} icon={wallet_icon} style={{color: wallet_color}}/>
                                </Popover>
                                <Popover title="event listings status" placement="bottom" content={event_content} trigger="hover">
                                    <SvgIcon className="ticket721_status_logo" size={20} icon={calendar} style={{color: event_color}}/>
                                </Popover>
                            </div>

                            <SeparatorTitle>
                            </SeparatorTitle>
                            <Nav id=''>
                                <NavIcon><SvgIcon size={20} icon={home}/></NavIcon>
                                <NavText><p className="navbar_title"> home </p></NavText>
                            </Nav>
                            <Nav id={account_id}>
                                <NavIcon><SvgIcon size={20} icon={user}/></NavIcon>
                                <NavText><p className="navbar_title">account</p></NavText>
                            </Nav>

                            <SeparatorTitle>
                            </SeparatorTitle>

                            <CsApiTracker/>

                            <SeparatorTitle>
                            </SeparatorTitle>
                        </SideNav>
                        <div style={{
                            width: '100%'
                        }}>
                    </div>
                        <InformationFeed/>
                    </div>
                    <div style={{background: '#121212', width: '1%', height: '100%', float: 'left'}}/>
                </div>
                <div className="right-div">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

_ConnectionTracker.contextTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

const mapStateToProps = (state, ownProps) => {
    const public_address = Object.keys(state.contracts.Ticket721Public).filter(elem => elem !== 'artifact')[0];
    const verified_address = Object.keys(state.contracts.Ticket721).filter(elem => elem !== 'artifact')[0];
    return {
        ...ownProps,
        csapi: state.csapi,
        backlink: state.backlink,
        wallet: state.wallet,
        public_wallet_live_count: callContract(getContract(state, 'Ticket721Public'), 'balanceOf', state.web3.coinbase),
        verified_wallet_live_count: callContract(getContract(state, 'Ticket721'), 'balanceOf', state.web3.coinbase),
        public_mint_events: getEvents(state, {event_name: 'Mint', contract_name: 'Ticket721Public', contract_address: state.contracts.Ticket721Public.deployed}, true),
        verified_mint_events: getEvents(state, {event_name: 'Mint', contract_name: 'Ticket721', contract_address: state.contracts.Ticket721.deployed}, true, "0x000000000000000000000000" + state.web3.coinbase.slice(2)),
        coinbase: state.web3.coinbase
    };
};

const  mapDispatchToProps = (dispatch) => {
    return {
        fetchWallets: () => {dispatch(CsApiFetchWallets())},
        test_fetchWallets: () => {dispatch(WalletFetch())}
    }
};

export const ConnectionTracker = withRouter(connect(_ConnectionTracker, mapStateToProps, mapDispatchToProps));
