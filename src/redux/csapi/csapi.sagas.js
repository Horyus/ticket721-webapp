import { call, put, select, takeEvery, take, takeLatest } from 'redux-saga/effects'
import {eventChannel, END} from 'redux-saga';
import {
    CsApiActionTypes,
    CsApiConnected, CsApiFetchWalletsDone, CsApiGetInfos, CsApiGotInfos,
    CsApiLoaded,
    CsApiRegistered
} from "./csapi.actions";
import {T721CSAPI} from "ticket721-csapi";
import {FeedNewError} from 'vort_x';

function* csapi_call_connect(instance) {
    return eventChannel((emit) => {
        instance.connect().then(connected => {
            emit(CsApiConnected(connected));
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
    const csapi = (yield select()).csapi;

    if (csapi.status === 'DISCONNECTED') {
        const call_connect = yield call(csapi_call_connect, csapi.instance);

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

function* csapi_call_register(instance) {
    return (eventChannel((emit) => {

        instance.register().then(connected => {
            emit(CsApiConnected(connected));
            emit(END);
        }).catch(e => {
            emit(END);
        });

        return (() => {});
    }));
}

function* call_register(action) {
    const csapi = (yield select()).csapi;

    if (csapi.status === 'NOT_REGISTERED') {
        const call_register = yield call(csapi_call_register, csapi.instance);

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

function* fetch_events(action) {
    console.log("FETCH EVERYTHING");
}

function* csapi_call_fetch_wallets(instance) {
    return eventChannel((emit) => {
        instance.fetch_wallets().then(wallets => {
            console.log(wallets);
            emit(CsApiFetchWalletsDone(wallets.public_wallet, wallets.verified_wallet));
            emit(END);
        }).catch(e => {
            emit(END);
        });
        return (() => {

        })
    });
}

function* csapi_call_get_infos(instance) {
    return eventChannel((emit) => {
        emit(CsApiGetInfos());
        instance.get_infos().then(infos => {
            console.log(infos);
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

function* fetch_wallets(action) {
    const csapi = (yield select()).csapi;

    if (csapi.status === 'CONNECTED') {
        const call_fetch_wallets = yield call(csapi_call_fetch_wallets, csapi.instance);

        try {
            while (true) {
                const event = yield take(call_fetch_wallets);
                yield put(event);
            }
        } finally {
            call_fetch_wallets.close();
        }
    } else {
        console.warn("Called fetch_wallets while in wrong status")
    }
}

export function* CsApiSagas() {
    yield takeEvery('LOADED_WEB3_BACKLINK', on_init);
    yield takeEvery(CsApiActionTypes.CSAPI_LOADED, call_loaded);
    yield takeEvery(CsApiActionTypes.CSAPI_LOADED, fetch_events);
    yield takeEvery(CsApiActionTypes.CSAPI_CALL_REGISTERED, call_registered);
    yield takeEvery(CsApiActionTypes.CSAPI_CALL_REGISTER, call_register);
    yield takeEvery(CsApiActionTypes.CSAPI_CALL_CONNECT, call_connect);
    yield takeEvery(CsApiActionTypes.CSAPI_CONNECTED, fetch_infos);
    yield takeEvery(CsApiActionTypes.CSAPI_FETCH_WALLETS, fetch_wallets);
}
