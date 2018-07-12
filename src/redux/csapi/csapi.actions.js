export const CsApiActionTypes = {
    CSAPI_INIT: 'CSAPI_INIT',
    CSAPI_LOADED: 'CSAPI_LOADED',
    CSAPI_CALL_REGISTERED: 'CSAPI_CALL_REGISTERED',
    CSAPI_CALL_REGISTER: 'CSAPI_CALL_REGISTER',
    CSAPI_REGISTERED: 'CSAPI_REGISTERED',
    CSAPI_CALL_CONNECT: 'CSAPI_CALL_CONNECT',
    CSAPI_CONNECTED: 'CSAPI_CONNECTED'
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
