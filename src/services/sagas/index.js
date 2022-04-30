import {all, call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects'
import * as ActionTypes from "../actions/userActions";
import {
	USER_PROFILE_UPDATE_FAILURE,
	USER_PROFILE_UPDATE_SUCCESS, userSetData,
	userSignInFailureAction,
	userSignOutFailureAction,
	userSignOutSuccessAction,
	userSignUpFailureAction, userTryAuthFailure
} from "../actions/userActions";
import AuthService from "../AuthService";
import UserService from "../UserService";


function* watchUserAuthentication() {
	yield takeLatest(ActionTypes.USER_SIGN_IN, userSignInSaga);
	yield takeLatest(ActionTypes.USER_SIGN_UP, userSignUpSaga);
	yield takeEvery(ActionTypes.USER_SIGN_OUT, userSignOutSaga);

	yield takeEvery(ActionTypes.USER_TRY_AUTH, userAuth);
	yield takeEvery(ActionTypes.USER_PROFILE_UPDATE, userProfileUpdateSaga);
}

function* userProfileUpdateSaga({payload}) {
	try {
		const result = yield call(UserService.update, payload);

		if (result.success) {
			yield put({type: USER_PROFILE_UPDATE_SUCCESS, payload: result.user})
		} else {
			yield put({type: USER_PROFILE_UPDATE_FAILURE, payload: result.message});
		}
	} catch (error) {
		yield put({type: USER_PROFILE_UPDATE_FAILURE, payload: error.toString()});
	}
}

function* userSignOutSaga() {
	try {
		const result = yield call(AuthService.logout);

		if (result.success) {
			yield all([call(AuthService.removeTokens), put(userSignOutSuccessAction())]);
		} else {
			yield put(userSignOutFailureAction(result.message));
		}
	} catch (error) {
		yield put(userSignOutFailureAction(error.toString()));
	}
}

function* userAuth() {
	try {
		const result = yield call(UserService.fetchUser);

		if (result.success) {
			yield put(userSetData(result.user))
		} else {
			yield put(userTryAuthFailure(result.message))
		}
	} catch (error) {
		yield put(userTryAuthFailure(error.toString()));
	}
}

function* userSignUpSaga({payload}) {
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
		yield put(userSignUpFailureAction(error.toString()));
	}
}

function* userSignInSaga({payload}) {
	try {
		const result = yield call(AuthService.login, payload);

		if (result.success) {
			yield all([
				call(AuthService.setTokens, result.accessToken || '', result.refreshToken || null),
				put({type: ActionTypes.USER_SIGN_IN_SUCCESS, payload: result.user})
			])
		} else {
			yield put(userSignInFailureAction(result.message));
		}
	} catch (error) {
		yield put(userSignInFailureAction(error.toString()));
	}
}

export default function* rootSaga() {
	yield fork(watchUserAuthentication);
}