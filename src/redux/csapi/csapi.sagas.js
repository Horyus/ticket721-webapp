import { call, put, select, takeEvery, take } from 'redux-saga/effects'
import {eventChannel, END} from 'redux-saga';
import {
    CsApiActionTypes,
    CsApiConnected,
    CsApiFetchWalletsDone,
    CsApiGetInfos,
    CsApiGettingEvents,
    CsApiGotAddressFromCode,
    CsApiGotEvents, CsApiGotHistory,
    CsApiGotInfos, CsApiGotInvalidAddressFromCode, CsApiGotSoldTickets,
    CsApiLoaded,
    CsApiRegistered
} from "./csapi.actions";
import {T721CSAPI} from "ticket721-csapi";
import {FeedNewError} from 'vort_x';
import cookie from 'react-cookies';

function* csapi_call_connect(instance, coinbase) {
    return eventChannel((emit) => {
        instance.connect().then(connected => {
            cookie.save('t721jwt' + coinbase.toLowerCase(), connected);
            emit(CsApiConnected(!!connected));
            emit(END);
        }).catch(e => {
            emit(FeedNewError(e, e.message, "[csapi.sagas.js][csapi_call_connect] Trying to connect"));
            emit(END);
        });
        return (() => {

        })
    });
}

function* call_connect(action) {
    const state = (yield select());
    const csapi = state.csapi;
    const coinbase = state.web3.coinbase;

    if (csapi.status === 'DISCONNECTED') {
        const call_connect = yield call(csapi_call_connect, csapi.instance, coinbase);

        try {
            while (true) {
                const event = yield take(call_connect);
                yield put(event);
            }
        } finally {
            call_connect.close();
        }
    } else {
        console.warn("Called connect while in wrong status")
    }

}

function* on_init(action) {
    try {
        const instance = new T721CSAPI(process.env.API_URL, action.coinbase, action._);
        yield put(CsApiLoaded(instance));
    } catch (e) {
        console.error(e);
    }
}

function* csapi_call_registered(instance) {
    return eventChannel((emit) => {
        instance.registered().then(registered => {
            emit(CsApiRegistered(registered.registered));
            emit(END);
        }).catch(e => {
            emit(END);
        });
        return (() => {

        })
    });
}
function* csapi_call_check_token(instance, coinbase) {
    return eventChannel((emit) => {
        let jwt;
        if ((jwt = cookie.load('t721jwt' + coinbase.toLowerCase()))) {
            instance.check_token(jwt).then(result => {
                if (result) {
                    emit(CsApiConnected(result));
                    emit(END);
                }
            })
        } else {
            emit(END);
        }
        return (() => {});
    });
}

function* call_check_token(action) {
    const coinbase = (yield select()).web3.coinbase;

    const call_check = yield call(csapi_call_check_token, action.instance, coinbase);

    try {
        while (true) {
            const event = yield take(call_check);
            yield put(event);
        }
    } finally {
        call_check.close();
    }
}

function* call_loaded(action) {
    const call_registered = yield call(csapi_call_registered, action.instance);

    try {
        while (true) {
            const event = yield take(call_registered);
            yield put(event);
        }
    } finally {
        call_registered.close();
    }
}

function* call_registered(action) {
    const instance = (yield select()).csapi.instance;
    const call_registered = yield call(csapi_call_registered, instance);

    try {
        while (true) {
            const event = yield take(call_registered);
            yield put(event);
        }
    } finally {
        call_registered.close();
    }
}

function* csapi_call_register(instance, coinbase) {
    return (eventChannel((emit) => {

        instance.register().then(connected => {
            cookie.save('t721jwt' + coinbase.toLowerCase(), connected);
            emit(CsApiConnected(!!connected));
            emit(END);
        }).catch(e => {
            emit(END);
        });

        return (() => {});
    }));
}

function* call_register(action) {
    const state = (yield select());
    const csapi = state.csapi;
    const coinbase = state.web3.coinbase;

    if (csapi.status === 'NOT_REGISTERED') {
        const call_register = yield call(csapi_call_register, csapi.instance, coinbase);

        try {
            while (true) {
                const event = yield take(call_register);
                yield put(event);
            }
        } finally {
            call_register.close();
        }
    } else {
        console.warn("Called register while in wrong status")
    }
}

function* csapi_call_get_events(instance) {
    return eventChannel((emit) => {
        emit(CsApiGettingEvents());
        instance.get_events().then(events => {
            emit(CsApiGotEvents(events));
            emit(END);
        }).catch(e => {
            emit(END);
        });
        return (() => {

        })
    });
}

function* fetch_events(action) {
    const csapi = (yield select()).csapi;

    const call_get_events = yield call(csapi_call_get_events, csapi.instance);

    try {
        while (true) {
            const event = yield take(call_get_events);
            yield put(event);
        }
    } finally {
        call_get_events.close();
    }
}

function* csapi_call_get_infos(instance) {
    return eventChannel((emit) => {
        emit(CsApiGetInfos());
        instance.get_infos().then(infos => {
            emit(CsApiGotInfos(infos.public_wallet, infos.verified_wallet));
            emit(END);
        }).catch(e => {
            emit(END);
        });
        return (() => {

        })
    });
}

function* fetch_infos(action) {
    const csapi = (yield select()).csapi;

    if (csapi.status === 'CONNECTED') {
        const call_get_infos = yield call(csapi_call_get_infos, csapi.instance);

        try {
            while (true) {
                const event = yield take(call_get_infos);
                yield put(event);
            }
        } finally {
            call_get_infos.close();
        }
    } else {
        console.warn("Called get_infos while in wrong status")
    }
}

function* csapi_get_address(instance, code) {
    return (eventChannel((emit) => {

        instance.get_address_from_code(code).then(address => {
            emit(CsApiGotAddressFromCode(code, address));
            emit(END);
        }).catch(e => {
            emit(CsApiGotInvalidAddressFromCode(code));
            emit(END);
        });

        return (() => {});
    }));
}

function* call_get_address(action) {
    const state = (yield select());
    const csapi = state.csapi;

    const call_get_addr = yield call(csapi_get_address, csapi.instance, action.code);

    try {
        while (true) {
            const event = yield take(call_get_addr);
            yield put(event);
        }
    } finally {
        call_get_addr.close();
    }
}

function* call_get_ticket_history(instance, action) {

    return eventChannel(emit => {
        instance.get_ticket_history(action.id, action.verified)
            .then(history => {
                emit(CsApiGotHistory(action.id, history));
                emit(END);
            })
            .catch(e => {
                emit(CsApiGotHistory(action.id, []));
                emit(END);
            });

        return (() => {});
    });

}

function* call_get_history(action) {
    const state = (yield select());
    const csapi = state.csapi;

    const call_get_ticket_hist = yield call(call_get_ticket_history, csapi.instance, action);

    try {
        while (true) {
            const event = yield take(call_get_ticket_hist);
            yield put(event);
        }
    } finally {
        call_get_ticket_hist.close();
    }

}

function* call_get_sold_tickets_channel(instance, action) {

    return eventChannel(emit => {
        instance.get_sold_tickets(action.verified)
            .then(tickets => {
                emit(CsApiGotSoldTickets(tickets));
                emit(END);
            })
            .catch(e => {
                emit(CsApiGotSoldTickets([]));
                emit(END);
            });

        return (() => {});
    });

}

function* call_get_sold_tickets(action) {
    const state = (yield select());
    const csapi = state.csapi;

    const call_get_ticket_hist = yield call(call_get_sold_tickets_channel, csapi.instance, action);

    try {
        while (true) {
            const event = yield take(call_get_ticket_hist);
            yield put(event);
        }
    } finally {
        call_get_ticket_hist.close();
    }

}

export function* CsApiSagas() {
    yield takeEvery('LOADED_WEB3_BACKLINK', on_init);
    yield takeEvery(CsApiActionTypes.CSAPI_LOADED, call_loaded);
    yield takeEvery(CsApiActionTypes.CSAPI_LOADED, fetch_events);
    yield takeEvery(CsApiActionTypes.CSAPI_LOADED, call_check_token);
    yield takeEvery(CsApiActionTypes.CSAPI_CALL_REGISTERED, call_registered);
    yield takeEvery(CsApiActionTypes.CSAPI_CALL_REGISTER, call_register);
    yield takeEvery(CsApiActionTypes.CSAPI_CALL_CONNECT, call_connect);
    yield takeEvery(CsApiActionTypes.CSAPI_CONNECTED, fetch_infos);
    yield takeEvery(CsApiActionTypes.CSAPI_GET_ADDRESS_FROM_CODE, call_get_address);
    yield takeEvery(CsApiActionTypes.CSAPI_GET_HISTORY, call_get_history);
    yield takeEvery(CsApiActionTypes.CSAPI_GET_SOLD_TICKETS, call_get_sold_tickets);
}
