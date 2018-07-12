import { call, put, select, takeEvery, take, takeLatest } from 'redux-saga/effects'
import {eventChannel, END} from 'redux-saga';
import {CsApiActionTypes, CsApiCallRegistered, CsApiLoaded, CsApiRegistered} from "./csapi.actions";
import {T721CSAPI} from "ticket721-csapi";

function* call_registered(action) {

}

function* csapi_call_connect(instance) {
    return eventChannel((emit) => {
        instance.connect().then(registered => {
            emit(END);
        }).catch(e => {
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
            console.error("LOLOLOL");
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

        instance.register().then(res => {
            emit(CsApiCallRegistered());
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

export function* CsApiSagas() {
    yield takeEvery('LOADED_WEB3_BACKLINK', on_init);
    yield takeEvery('CSAPI_LOADED', call_loaded);
    yield takeEvery(CsApiActionTypes.CSAPI_CALL_REGISTERED, call_registered);
    yield takeEvery(CsApiActionTypes.CSAPI_CALL_REGISTER, call_register);
    yield takeEvery(CsApiActionTypes.CSAPI_CALL_CONNECT, call_connect);
}
