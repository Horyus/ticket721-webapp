import {WalletActionTypes} from "./wallet.actions";

export const wallet = (state = {}, action) => {
    switch (action.type) {
        case WalletActionTypes.WALLET_FETCH:
            return {
                ...state,
                status: 'FETCHING'
            };
        case WalletActionTypes.WALLET_FETCH_DONE:
            return {
                ...state,
                status: 'IDLE',
                verified_wallet: action.verified_wallet,
                public_wallet: action.public_wallet
            };
    }
    return state;
};
