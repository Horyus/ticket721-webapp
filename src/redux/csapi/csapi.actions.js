export const CsApiActionTypes = {
    CSAPI_INIT: 'CSAPI_INIT',
    CSAPI_LOADED: 'CSAPI_LOADED',
    CSAPI_CALL_REGISTERED: 'CSAPI_CALL_REGISTERED',
    CSAPI_CALL_REGISTER: 'CSAPI_CALL_REGISTER',
    CSAPI_REGISTERED: 'CSAPI_REGISTERED',
    CSAPI_CALL_CONNECT: 'CSAPI_CALL_CONNECT',
    CSAPI_CONNECTED: 'CSAPI_CONNECTED',
    CSAPI_GET_INFOS: 'CSAPI_GET_INFOS',
    CSAPI_GOT_INFOS: 'CSAPI_GOT_INFOS',
    CSAPI_FETCH_WALLETS: 'CSAPI_FETCH_WALLETS',
    CSAPI_FETCH_WALLETS_DONE: 'CSAPI_FETCH_WALLETS_DONE',
    CSAPI_GET_EVENTS: 'CSAPI_GET_EVENTS',
    CSAPI_GETTING_EVENTS: 'CSAPI_GETTING_EVENTS',
    CSAPI_GOT_EVENTS: 'CSAPI_GOT_EVENTS',
    CSAPI_GET_ADDRESS_FROM_CODE: 'CSAPI_GET_ADDRESS_FROM_CODE',
    CSAPI_GOT_ADDRESS_FROM_CODE: 'CSAPI_GOT_ADDRESS_FROM_CODE',
    CSAPI_GOT_INVALID_ADDRESS_FROM_CODE: 'CSAPI_GOT_INVALID_ADDRESS_FROM_CODE',
    CSAPI_GET_HISTORY: 'CSAPI_GET_HISTORY',
    CSAPI_GOT_HISTORY: 'CSAPI_GOT_HISTORY'
};

export const CsApiInit = (url, coinbase) => {
    return ({
        type: CsApiActionTypes.CSAPI_INIT,
        url,
        coinbase
    });
};

export const CsApiLoaded = (instance) => {
    return ({
        type: CsApiActionTypes.CSAPI_LOADED,
        instance
    });
};

export const CsApiCallRegistered = (registered) => {
    return {
        type: CsApiActionTypes.CSAPI_CALL_REGISTERED,
        registered
    }
};

export const CsApiCallRegister = () => {
    return {
        type: CsApiActionTypes.CSAPI_CALL_REGISTER
    }
};

export const CsApiRegistered = (registered) => {
    return {
        type: CsApiActionTypes.CSAPI_REGISTERED,
        registered
    }
};

export const CsApiCallConnect = () => {
    return {
        type: CsApiActionTypes.CSAPI_CALL_CONNECT
    }
};

export const CsApiConnected = (connected) => {
    return {
        type: CsApiActionTypes.CSAPI_CONNECTED,
        connected
    }
};

export const CsApiGetInfos = () => {
    return {
        type: CsApiActionTypes.CSAPI_GET_INFOS
    }
};

export const CsApiGotInfos = (public_wallet, verified_wallet) => {
    return {
        type: CsApiActionTypes.CSAPI_GOT_INFOS,
        public_wallet,
        verified_wallet
    }
};

export const CsApiFetchWallets = () => {
    return {
        type: CsApiActionTypes.CSAPI_FETCH_WALLETS
    }
};

export const CsApiFetchWalletsDone = (public_wallet, verified_wallet) => {
    return {
        type: CsApiActionTypes.CSAPI_FETCH_WALLETS_DONE,
        public_wallet,
        verified_wallet
    }
};

export const CsApiGetEvents = () => {
    return {
        type: CsApiActionTypes.CSAPI_GET_EVENTS
    }
};

export const CsApiGettingEvents = () => {
    return {
        type: CsApiActionTypes.CSAPI_GETTING_EVENTS
    }
};

export const CsApiGotEvents = (events) => {
    return {
        type: CsApiActionTypes.CSAPI_GOT_EVENTS,
        events
    }
};

export const CsApiGetAddressFromCode = (code) => {
    return {
        type: CsApiActionTypes.CSAPI_GET_ADDRESS_FROM_CODE,
        code
    }
};

export const CsApiGotAddressFromCode = (code, address) => {
    return {
        type: CsApiActionTypes.CSAPI_GOT_ADDRESS_FROM_CODE,
        code,
        address
    }
};

export const CsApiGotInvalidAddressFromCode = (code) => {
    return {
        type: CsApiActionTypes.CSAPI_GOT_INVALID_ADDRESS_FROM_CODE,
        code
    }
};

export const CsApiGetHistory = (verified, id) => {
    return {
        type: CsApiActionTypes.CSAPI_GET_HISTORY,
        verified,
        id
    }
};

export const CsApiGotHistory = (id, history) => {
    return {
        type: CsApiActionTypes.CSAPI_GOT_HISTORY,
        history,
        id
    }
};

