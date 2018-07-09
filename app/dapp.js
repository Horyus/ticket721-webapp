import React from 'react';
import ReactDOM from 'react-dom';

//import EmbarkJS from 'Embark/EmbarkJS';
import * as Chains from '../chains.json';
import Ticket721 from 'Embark/contracts/Ticket721';
import Ticket721Hub from 'Embark/contracts/Ticket721Hub';
import Ticket721Event from 'Embark/contracts/Ticket721Event';
import {FeedNotifications} from "./components/feed-notifications";
import {VortexGate, VortexWeb3Loading, VortexWeb3Loaded, VortexWeb3LoadError, VortexWeb3NetworkError, VortexWeb3Locked, VortexMetamaskLoader} from 'vort_x-components';
import Web3 from 'web3';
import * as Manifest from '../manifest.json';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Home} from "./views/home";
import {Sale} from "./views/sale";

import './css/open-sans.css';
import './css/oswald.css';
import './css/pure-min.css';
import {ManifestLoader} from "./components/manifest_loader";
import {Loader} from "./components/loader";
import {search} from "./redux/search/search.reducers";

import './dapp.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.initialState = {
            search: ""
        };
        this.reducers = {
            search
        };
    }

    render(){
        return (
            <VortexGate
                contracts={{
                    type: 'embark',
                    embark_contracts: {
                        Ticket721: Ticket721,
                        Ticket721Hub: Ticket721Hub,
                        Ticket721Event: Ticket721Event
                    },
                    chains: Chains,
                    preloaded_contracts: ["Ticket721Hub", "Ticket721"]
                }}

                loader={VortexMetamaskLoader(Web3)}

                reducers_map={this.reducers}

                custom_state={this.initialState}

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
                        <ManifestLoader manifest={Manifest}>
                            <BrowserRouter>
                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <Route path="/sale/:address" component={Sale}/>
                                </Switch>
                            </BrowserRouter>
                        </ManifestLoader>
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
