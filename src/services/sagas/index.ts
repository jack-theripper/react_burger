import {all, call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects'
import * as ActionTypes from "../actions/userActions";
import {
    userSetData,
    userSignInFailureAction,
    userSignOutFailureAction,
    userSignOutSuccessAction,
    userSignUpFailureAction,
    userTryAuthFailure
} from "../actions/userActions";
import AuthService from "../AuthService";
import UserService from "../UserService";
import {History} from 'history';

type SagaAction = {
    type: keyof typeof ActionTypes;
    payload: any;
}

type SagaActionHistory = SagaAction & {
    history: History;
}

function* watchUserAuthentication(): IterableIterator<any> {
    yield takeLatest(ActionTypes.USER_SIGN_IN, userSignInSaga);
    yield takeLatest(ActionTypes.USER_SIGN_UP, userSignUpSaga);
    yield takeEvery(ActionTypes.USER_SIGN_OUT, userSignOutSaga);

    yield takeEvery(ActionTypes.USER_TRY_AUTH, userAuth);
    yield takeEvery(ActionTypes.USER_PROFILE_UPDATE, userProfileUpdateSaga);

    yield takeLatest(ActionTypes.USER_PASSWORD_RESET_REQUEST, userPasswordResetReqSaga);
    yield takeLatest(ActionTypes.USER_PASSWORD_RESET_CONFIRM_REQUEST, userPasswordResetConfirmSaga);
}

function* userPasswordResetReqSaga({payload: email, history}: SagaActionHistory): any {
    try {
        const result = yield call(UserService.resetPassword, {email});

        if (result.success) {
            yield call(history.push, '/reset-password', {from: '/forgot-password'})
        } else {
            console.error('ForgotPasswordHandler: ', result)
        }
    } catch (error) {
        console.error('ForgotPasswordHandler: ', error);
    }
}

function* userPasswordResetConfirmSaga({payload, history}: SagaActionHistory): any {
    try {
        const {newPassword, confirmCode} = payload;
        const result = yield call(UserService.resetPasswordConfirm, newPassword, confirmCode);

        if (result.success) {
            yield call(history.push, '/login')
        }
    } catch (error) {
        console.error('ResetPasswordHandler: ', error);
    }
}

function* userProfileUpdateSaga({payload}: SagaAction): any {
    try {
        const result = yield call(UserService.update, payload);

        if (result.success) {
            yield put({type: ActionTypes.USER_PROFILE_UPDATE_SUCCESS, payload: result.user})
        } else {
            yield put({type: ActionTypes.USER_PROFILE_UPDATE_FAILURE, payload: result.message});
        }
    } catch (error) {
        if (error instanceof Error) {
            yield put({type: ActionTypes.USER_PROFILE_UPDATE_FAILURE, payload: error.toString()});
        }
    }
}

function* userSignOutSaga(): any {
    try {
        const result = yield call(AuthService.logout);

        if (result.success) {
            yield all([call(AuthService.removeTokens), put(userSignOutSuccessAction())]);
        } else {
            yield put(userSignOutFailureAction(result.message));
        }
    } catch (error) {
        if (error instanceof Error) {
            yield put(userSignOutFailureAction(error.toString()));
        }
    }
}

function* userAuth(): any {
    try {
        const result = yield call(UserService.fetchUser);

        if (result.success) {
            yield put(userSetData(result.user))
        } else {
            yield put(userTryAuthFailure(result.message))
        }
    } catch (error) {
        if (error instanceof Error) {
            yield put(userTryAuthFailure(error.toString()));
        }
    }
}

function* userSignUpSaga({payload}: SagaAction): any {
    try {
        const result = yield call(AuthService.create, payload);

        if (result.success) {
            yield all([
                call(AuthService.updateTokens, result),
                put({type: ActionTypes.USER_SIGN_UP_SUCCESS, payload: result.user})
            ])
        } else {
            yield put(userSignUpFailureAction(result.message));
        }
    } catch (error) {
        if (error instanceof Error) {
            yield put(userSignUpFailureAction(error.toString()));
        }
    }
}

function* userSignInSaga({payload}: SagaAction): any {
    try {
        const result = yield call(AuthService.login, payload);

        if (result.success) {
            yield all([
                call(AuthService.updateTokens, result),
                put({type: ActionTypes.USER_SIGN_IN_SUCCESS, payload: result.user})
            ])
        } else {
            yield put(userSignInFailureAction(result.message));
        }
    } catch (error) {
        if (error instanceof Error) {
            yield put(userSignInFailureAction(error.toString()));
        }
    }
}

export default function* rootSaga() {
    yield fork(watchUserAuthentication);
}