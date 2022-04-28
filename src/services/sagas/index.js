import {all, call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects'
import * as ActionTypes from "../actions/userActions";
import {userSetInfo, userSignInFailureAction, userSignUpFailureAction} from "../actions/userActions";
import AuthService from "../AuthService";
import UserService from "../UserService";


function* watchUserAuthentication() {
	yield takeEvery(ActionTypes.USER_TRY_AUTH, userAuth);
	yield takeLatest(ActionTypes.USER_SIGN_UP, userSignUpSaga);
	yield takeLatest(ActionTypes.USER_SIGN_IN, userSignInSaga);
}

function* userAuth() {
	try {

		const token = localStorage.getItem('token');

		const result = yield UserService.fetchUser(token);

		if (result.success) {
			yield put(userSetInfo(result.user))
		}


	} catch (error) {
		console.log('Error: ' + error)
	}
}

function* userSignUpSaga({payload}) {
	try {
		const result = yield call(AuthService.create, payload);

		if (result.success) {
			yield all([
				call(AuthService.setTokens, result.accessToken || '', result.refreshToken || null),
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
	// yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
	yield fork(watchUserAuthentication);
}