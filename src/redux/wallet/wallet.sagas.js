import { call, put, select, takeEvery, take } from 'redux-saga/effects'
import {eventChannel, END} from 'redux-saga';
import {WalletActionTypes, WalletFetchDone} from "./wallet.actions";
import {FeedNewError, getContract, Vortex} from 'vort_x';
import {CsApiActionTypes, CsApiFetchedSoldTicketsInfos, CsApiFetchingSoldTicketInfos} from "../csapi/csapi.actions";

function* wallet_updater() {
    const state = yield select();
    const Ticket721 = state.contracts.Ticket721[state.contracts.Ticket721.deployed.toLowerCase()].instance;
    const Ticket721Public = state.contracts.Ticket721Public[state.contracts.Ticket721Public.deployed.toLowerCase()].instance;
    const coinbase = state.web3.coinbase;

    return eventChannel((emit) => {

        let verified_wallet = [];
        let public_wallet = [];

        Ticket721.methods.balanceOf(coinbase).call().then(verified_amount => {
            Ticket721Public.methods.balanceOf(coinbase).call().then(async public_amount => {
                try {
                    for (let ver_idx = 0; ver_idx < verified_amount; ++ver_idx) {
                        verified_wallet.push(await Ticket721.methods.tokenOfOwnerByIndex(coinbase, ver_idx).call());
                    }
                    for (let pub_idx = 0; pub_idx < public_amount; ++pub_idx) {
                        public_wallet.push(await Ticket721Public.methods.tokenOfOwnerByIndex(coinbase, pub_idx).call());
                    }
                    emit(WalletFetchDone(verified_wallet, public_wallet));
                } catch (e) {
                    emit(FeedNewError(e, e.message, "[wallet.sagas.js][wallet_updater] Trying to fetch wallets"));
                    emit(END);
                }
            }).catch(e => {
                emit(FeedNewError(e, e.message, "[wallet.sagas.js][wallet_updater] Trying to fetch wallets"));
                emit(END);
            });
        }).catch(e => {
            emit(FeedNewError(e, e.message, "[wallet.sagas.js][wallet_updater] Trying to fetch wallets"));
            emit(END);
        });

        return () => {};
    })

}

function* wallet_fetch() {
    const fetcher = yield call(wallet_updater);

    try {
        while (true) {
            const event = yield take(fetcher);
            yield put(event);
        }
    } finally {
        fetcher.close();
    }
}

function* fetch_sold_infos_channel(action) {

    const state = yield select();

    return (eventChannel(emit => {

        setTimeout(async () => {
            const contract = getContract(state, 'Ticket721');
            for (let idx = 0; idx < action.tickets.length; ++idx) {
                emit(CsApiFetchingSoldTicketInfos(action.tickets[idx]));
                const event = await contract.vortexMethods.fromEvent.call(action.tickets[idx]);
                const event_contract = getContract(state, 'Ticket721Controller', event, true);
                const price = await event_contract.vortexMethods.getTicketPrice.call(action.tickets[idx]);
                const uri = await contract.vortexMethods.tokenURI.call(action.tickets[idx]);
                const extracted_uri = uri.slice(28);
                Vortex.get().fetchIPFSHash(extracted_uri);
                emit(CsApiFetchedSoldTicketsInfos(action.tickets[idx], {ipfs: extracted_uri, price, eaddress: event}));
            }
            emit(END);
        }, 100);

        return () => {};
    }));
}

function* fetch_sold_infos(action) {

    const fetch_sold_infos_channel_var = yield call(fetch_sold_infos_channel, action);

    try {
        while (true) {
            const event = yield take(fetch_sold_infos_channel_var);
            yield put (event);
        }
    } finally {
        fetch_sold_infos_channel_var.close();
    }

}

export function* WalletSagas() {
    yield takeEvery(WalletActionTypes.WALLET_FETCH, wallet_fetch);
    yield takeEvery(CsApiActionTypes.CSAPI_GOT_SOLD_TICKETS, fetch_sold_infos);
}
