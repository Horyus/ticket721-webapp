import {CsApiActionTypes} from "./csapi.actions";

const CsApiLoadedReducer = (state, action) => {
    return {
        ...state,
        instance: action.instance
    }
};

const CsApiConnectedReducer = (state, action) => {
    return {
        ...state,
        status: action.connected ? 'CONNECTED' : 'DISCONNECTED'
    }
};

const CsApiRegisteredReducer = (state, action) => {
    return {
        ...state,
        status: action.registered ? 'DISCONNECTED' : 'NOT_REGISTERED'
    }
};

const CsApiGetInfosReducer = (state) => {
    return {
        ...state,
        wallet_status: 'FETCHING'
    };
};

const CsApiGotInfosReducer = (state, action) => {
    return {
        ...state,
        wallet_status: 'IDLE',
        public_wallet: action.public_wallet,
        verified_wallet: action.verified_wallet
    }
};

const CsApiGettingEventsReducer = (state, action) => {
    return {
        ...state,
        event_status: 'FETCHING'
    }
};

const CsApiGotEventsReducer = (state, action) => {
    return {
        ...state ,
        event_status: 'IDLE',
        events: action.events
    }
};

export const csapi = (state = {status: 'DISCONNECTED', wallet_status: 'NONE', event_status: 'NONE', public_wallet: [], varified_wallet: [], events: []}, action) => {

    switch (action.type) {
        case (CsApiActionTypes.CSAPI_LOADED):
            return CsApiLoadedReducer(state, action);
        case (CsApiActionTypes.CSAPI_CONNECTED):
            return CsApiConnectedReducer(state, action);
        case (CsApiActionTypes.CSAPI_REGISTERED):
            return CsApiRegisteredReducer(state, action);
        case (CsApiActionTypes.CSAPI_GET_INFOS):
            return CsApiGetInfosReducer(state, action);
        case (CsApiActionTypes.CSAPI_GOT_INFOS):
            return CsApiGotInfosReducer(state, action);
        case (CsApiActionTypes.CSAPI_GETTING_EVENTS):
            return CsApiGettingEventsReducer(state, action);
        case (CsApiActionTypes.CSAPI_GOT_EVENTS):
            return CsApiGotEventsReducer(state, action);
        default:
            return state
    }

};
