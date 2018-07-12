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

export const csapi = (state = {status: 'DISCONNECTED'}, action) => {

    switch (action.type) {
        case (CsApiActionTypes.CSAPI_LOADED):
            return CsApiLoadedReducer(state, action);
        case (CsApiActionTypes.CSAPI_CONNECTED):
            return CsApiConnectedReducer(state, action);
        case (CsApiActionTypes.CSAPI_REGISTERED):
            return CsApiRegisteredReducer(state, action);
        default:
            return state
    }

};
