import React from 'react';
import ReactDOM from 'react-dom';

//import EmbarkJS from 'Embark/EmbarkJS';
import * as Chains from '../chains.json';
import Ticket721 from 'Embark/contracts/Ticket721';
import Ticket721HUB from 'Embark/contracts/Ticket721HUB';
import {FeedNotifications} from "./components/feed-notifications";
import {VortexGate, VortexWeb3Loading, VortexWeb3Loaded, VortexWeb3LoadError, VortexWeb3NetworkError, VortexMetamaskLoader} from 'vort_x-components';
import Web3 from 'web3';
import * as Manifest from '../manifest.json';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Home} from "./views/home";
import {Sale} from "./views/sale";

import './css/open-sans.css';
import './css/oswald.css';
import './css/pure-min.css';
import {ManifestLoader} from "./components/manifest_loader";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }


    render(){
        return (
            <VortexGate
                contracts={{
                    type: 'embark',
                    contracts: {
                        Ticket721: Ticket721,
                        Ticket721HUB: Ticket721HUB
                    },
                    chains: Chains,
                    preloaded_contracts: ["Ticket721HUB"]
                }}

                loader={VortexMetamaskLoader(Web3)}

            >
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
                    Loading
                </VortexWeb3Loading>
                <VortexWeb3NetworkError>
                    Salot
                </VortexWeb3NetworkError>
                <VortexWeb3LoadError>
                    Salut
                </VortexWeb3LoadError>
            </VortexGate>
        );
    }
}

ReactDOM.render(<App></App>, document.getElementById('app'));
