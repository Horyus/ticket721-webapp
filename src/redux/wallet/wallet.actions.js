export const WalletActionTypes = {
    WALLET_FETCH: 'WALLET_FETCH',
    WALLET_FETCH_DONE: 'WALLET_FETCH_DONE',
};

export const WalletFetch = () => {
    return ({
        type: WalletActionTypes.WALLET_FETCH
    });
};

export const WalletFetchDone = (verified_wallet, public_wallet) => {
    return ({
        type: WalletActionTypes.WALLET_FETCH_DONE,
        verified_wallet,
        public_wallet
    });
};

