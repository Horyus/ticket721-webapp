import React from 'react';
import ReactDOM from 'react-dom';

import Ticket721 from '../dist/contracts/Ticket721';
import Ticket721Public from '../dist/contracts/Ticket721Public';
import Ticket721Hub from '../dist/contracts/Ticket721Hub';
import Ticket721Event from '../dist/contracts/Ticket721Event';
import Ticket721Controller from '../dist/contracts/Ticket721Controller';
import {FeedNotifications} from "./components/feed-notifications";
import {VortexGate, VortexWeb3Loading, VortexWeb3Loaded, VortexWeb3LoadError, VortexWeb3NetworkError, VortexWeb3Locked, VortexMetamaskLoader} from 'vort_x-components';
import Web3 from 'web3';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Home} from "./views/home";
import {Sale} from "./views/sale";
import {Account} from "./views/account";
import {PublicTicket} from "./views/public_ticket";
import {VerifiedTicket} from "./views/verified_ticket";

import {ConnectionTracker} from "./components/connection_tracker";

import './css/open-sans.css';
import './css/oswald.css';
import './css/pure-min.css';
import {Loader} from "./components/loader";
import {search} from "./redux/search/search.reducers";
import {csapi} from './redux/csapi/csapi.reducers';
import {CsApiSagas} from "./redux/csapi/csapi.sagas";

import './dapp.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.initialState = {
            search: "",
            csapi: {
                status: 'DISCONNECTED',
                wallet_status: 'NONE',
                event_status: 'NONE',
                public_wallet: [],
                verified_wallet: [],
                events: []
            }
        };
        this.reducers = {
            search,
            csapi
        };
        this.sagas = [
            CsApiSagas
        ]
    }

    render(){
        return (
            <VortexGate
                contracts={{
                    type: 'manual',
                    manual_contracts: {

                        Ticket721: {
                            abi: Ticket721.abiDefinition,
                            at: Ticket721.deployedAddress,
                            deployed_bytecode: Ticket721.runtimeBytecode
                        },

                        Ticket721Public: {
                            abi: Ticket721Public.abiDefinition,
                            at: Ticket721Public.deployedAddress,
                            deployed_bytecode: Ticket721Public.runtimeBytecode
                        },

                        Ticket721Hub: {
                            abi: Ticket721Hub.abiDefinition,
                            at: Ticket721Hub.deployedAddress,
                            deployed_bytecode: Ticket721Hub.runtimeBytecode
                        },

                        Ticket721Controller: {
                            abi: Ticket721Controller.abiDefinition,
                            deployed_bytecode: Ticket721Controller.runtimeBytecode
                        }

                    }

                }}

                loader={VortexMetamaskLoader(Web3)}

                reducers_map={this.reducers}

                custom_state={this.initialState}

                custom_sagas={this.sagas}

                ipfs_config={{
                    host: 'ipfs.infura.io',
                    port: '5001',
                    options: {
                        protocol: 'https'
                    }
                }}

                // Configure your backlink endpoint
                backlink_config={{
                    url: {
                        "mainnet": "wss://mainnet.infura.io/ws",
                        "default": "ws://localhost:8545"
                    }
                }}>

                <VortexWeb3Loaded>
                    <FeedNotifications>
                        <BrowserRouter>
                            <ConnectionTracker>
                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <Route path="/sale/:address" component={Sale}/>
                                    <Route path="/account/:address" component={Account}/>
                                    <Route path="/ticket/public/:id" component={PublicTicket}/>
                                    <Route path="/ticket/verified/:id" component={VerifiedTicket}/>
                                </Switch>
                            </ConnectionTracker>
                        </BrowserRouter>
                    </FeedNotifications>
                </VortexWeb3Loaded>
                <VortexWeb3Loading>
                    <Loader/>
                </VortexWeb3Loading>
                <VortexWeb3NetworkError>
                    <h2 className="error_msg">You are on the wrong Ethereum Network 🛰</h2>
                </VortexWeb3NetworkError>
                <VortexWeb3LoadError>
                    <h2 className="error_msg">An Error occured when we tried to recover Web3 🙁</h2>
                </VortexWeb3LoadError>
                <VortexWeb3Locked>
                    <h2 className="error_msg">Psst. Looks like someone forgot to unlock its wallet provider ! 🔐🦊</h2>
                </VortexWeb3Locked>
            </VortexGate>
        );
    }
}

ReactDOM.render(<App></App>, document.getElementById('app'));
