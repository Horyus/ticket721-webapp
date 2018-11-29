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

const CsApiGetAddressFromCode = (state, action) => {
    return {
        ...state,
        codes: {
            ...state.codes,
            [action.code]: 'Fetching ...'
        }
    }
};

const CsApiGotAddressFromCode = (state, action) => {
    return {
        ...state,
        codes: {
            ...state.codes,
            [action.code]: action.address
        }
    }
};

const CsApiGotInvalidAddressFromCode = (state, action) => {
    return {
        ...state,
        codes: {
            ...state.codes,
            [action.code]: 'Invalid Code'
        }
    };
};

const CsApiGetHistory = (state, action) => {

    return {
        ...state,
        ticket_histories: {
            ...state.ticket_histories,
            [action.id]: {
                status: 'FETCHING',
                history: state.ticket_histories[action.id] ? state.ticket_histories[action.id].history : []
            }
        }
    };

};

const CsApiGotHistory = (state, action) => {

    return {
        ...state,
        ticket_histories: {
            ...state.ticket_histories,
            [action.id]: {
                status: 'READY',
                history: action.history
            }
        }
    };

};

const CsApiGetSoldTickets = (state, action) => {
    return {
        ...state,
        sold_ticket_status: 'FETCHING'
    };
};

const CsApiGotSoldTickets = (state, action) => {
    return {
        ...state,
        sold_ticket_status: 'READY',
        sold_tickets: [
            ...action.tickets.map(e => {
                return ({
                    id: e,
                    status: 'NONE'
                })
            })
        ]
    };
};

const CsApiFetchingSoldTicketInfos = (state, action) => {
    for (let idx = 0; idx < state.sold_tickets.length; ++idx) {
        if (state.sold_tickets[idx].id === action.ticket_id) {
            state.sold_tickets[idx].status = 'FETCHING';
            break ;
        }
    }
    return {
        ...state,
        sold_tickets: [
            ...state.sold_tickets
        ]
    }
};

const CsApiFetchedSoldTicketInfos = (state, action) => {
    for (let idx = 0; idx < state.sold_tickets.length; ++idx) {
        if (state.sold_tickets[idx].id === action.ticket_id) {
            state.sold_tickets[idx].status = 'FETCHED';
            state.sold_tickets[idx].infos = action.ticket_infos;
            break ;
        }
    }
    return {
        ...state,
        sold_tickets: [
            ...state.sold_tickets
        ]
    }
};

export const csapi = (state = {status: 'DISCONNECTED', wallet_status: 'NONE', event_status: 'NONE', public_wallet: [], varified_wallet: [], events: [], codes: {}, ticket_histories: {}, sold_tickets: [], sold_ticket_status: 'NONE'}, action) => {

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
        case (CsApiActionTypes.CSAPI_GET_ADDRESS_FROM_CODE):
            return CsApiGetAddressFromCode(state, action);
        case (CsApiActionTypes.CSAPI_GOT_ADDRESS_FROM_CODE):
            return CsApiGotAddressFromCode(state, action);
        case (CsApiActionTypes.CSAPI_GOT_INVALID_ADDRESS_FROM_CODE):
            return CsApiGotInvalidAddressFromCode(state, action);
        case (CsApiActionTypes.CSAPI_GET_HISTORY):
            return CsApiGetHistory(state, action);
        case (CsApiActionTypes.CSAPI_GOT_HISTORY):
            return CsApiGotHistory(state, action);
        case (CsApiActionTypes.CSAPI_GET_SOLD_TICKETS):
            return CsApiGetSoldTickets(state, action);
        case (CsApiActionTypes.CSAPI_GOT_SOLD_TICKETS):
            return CsApiGotSoldTickets(state, action);
        case (CsApiActionTypes.CSAPI_FETCHING_SOLD_TICKET_INFOS):
            return CsApiFetchingSoldTicketInfos(state, action);
        case (CsApiActionTypes.CSAPI_FETCHED_SOLD_TICKET_INFOS):
            return CsApiFetchedSoldTicketInfos(state, action);
        default:
            return state
    }

};
