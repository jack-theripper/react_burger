import {Profile, UserType} from "../../types/types";
import {History} from 'history';

export const USER_PASSWORD_RESET_REQUEST = 'USER_PASSWORD_RESET_REQUEST';
export const USER_PASSWORD_RESET_CONFIRM_REQUEST = 'USER_PASSWORD_RESET_CONFIRM_REQUEST';

export const USER_SET_INFO = 'USER_SET_INFO';

export const USER_TRY_AUTH = 'USER_TRY_AUTH';
export const USER_TRY_AUTH_FAILURE = 'USER_TRY_AUTH_FAILURE';

export const USER_SIGN_UP = 'USER_SIGN_UP';
export const USER_SIGN_UP_SUCCESS = 'USER_SIGN_UP_SUCCESS';
export const USER_SIGN_UP_FAILURE = 'USER_SIGN_UP_FAILURE';

export const USER_SIGN_IN = 'USER_SIGN_IN';
export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS';
export const USER_SIGN_IN_FAILURE = 'USER_SIGN_IN_FAILURE';

export const USER_SIGN_OUT = 'USER_SIGN_OUT';
export const USER_SIGN_OUT_SUCCESS = 'USER_SIGN_OUT_SUCCESS';
export const USER_SIGN_OUT_FAILURE = 'USER_SIGN_OUT_FAILURE';

export const USER_PROFILE_UPDATE = 'USER_PROFILE_UPDATE';
export const USER_PROFILE_UPDATE_SUCCESS = 'USER_PROFILE_UPDATE_SUCCESS';
export const USER_PROFILE_UPDATE_FAILURE = 'USER_PROFILE_UPDATE_FAILURE';

export interface UserSignUp {
    readonly type: typeof USER_SIGN_UP;
    readonly payload: {
        email: string;
        password: string;
        name: string;
    };
}

export interface UserSignUpFailure {
    readonly type: typeof USER_SIGN_UP_FAILURE;
    readonly payload: string;
}

export interface UserSignIn {
    readonly type: typeof USER_SIGN_IN;
    readonly payload: {
        email: string;
        password: string;
    }
}

export interface UserSignInFailure {
    readonly type: typeof USER_SIGN_IN_FAILURE;
    readonly payload: string;
}

export interface UserProfileUpdate {
    readonly type: typeof USER_PROFILE_UPDATE;
    readonly payload: Profile;
}

export interface UserSignOut {
    readonly type: typeof USER_SIGN_OUT;
}

export interface UserSignOutSuccess {
    readonly type: typeof USER_SIGN_OUT_SUCCESS;
}

export interface UserSignOutFailure {
    readonly type: typeof USER_SIGN_OUT_FAILURE;
    readonly payload: string;
}

export interface UserTryAuth {
    readonly type: typeof USER_TRY_AUTH;
}

export interface UserTryAuthFailure {
    readonly type: typeof USER_TRY_AUTH_FAILURE;
    readonly payload: string;
}

export interface UserSetData {
    readonly type: typeof USER_SET_INFO;
    readonly payload: Profile;
}

export interface UserResetPasswordRequest {
    readonly type: typeof USER_PASSWORD_RESET_REQUEST;
    readonly payload: string;
    readonly history: History;
}

export interface UserResetPasswordConfirmation {
    readonly type: typeof USER_PASSWORD_RESET_CONFIRM_REQUEST;
    readonly payload: {
        newPassword: string;
        confirmCode: string;
    };
    readonly history: History;
}

export interface UserSignUpSuccess {
    readonly type: typeof USER_SIGN_UP_SUCCESS;
    readonly payload: UserType;
}

export interface UserSignInSuccess {
    readonly type: typeof USER_SIGN_IN_SUCCESS;
    readonly payload: UserType;
}

export interface UserProfileUpdateSuccess {
    readonly type: typeof USER_PROFILE_UPDATE_SUCCESS;
    readonly payload: UserType;
}

export type TUserActions = UserSignUp | UserSignUpSuccess | UserSignUpFailure | UserSignIn | UserSignInFailure
    | UserSignInSuccess | UserProfileUpdate | UserSignOut | UserSignOutSuccess | UserSignOutFailure | UserTryAuth
    | UserProfileUpdateSuccess | UserTryAuthFailure | UserSetData | UserResetPasswordRequest | UserResetPasswordConfirmation;

export function userSignUpAction(email: string, password: string, name: string): UserSignUp {
    return {
        type: USER_SIGN_UP,
        payload: {
            email, password, name
        }
    }
}

export function userSignUpFailureAction(errorMessage: string = ''): UserSignUpFailure {
    return {
        type: USER_SIGN_UP_FAILURE,
        payload: errorMessage
    }
}

export function userSignInAction(email: string, password: string): UserSignIn {
    return {
        type: USER_SIGN_IN,
        payload: {
            email, password
        }
    }
}

export function userSignInFailureAction(errorMessage: string = ''): UserSignInFailure {
    return {
        type: USER_SIGN_IN_FAILURE,
        payload: errorMessage
    }
}

export function userProfileUpdateAction(state: Profile): UserProfileUpdate {
    return {
        type: USER_PROFILE_UPDATE,
        payload: state
    }
}

export function userSignOutAction(): UserSignOut {
    return {
        type: USER_SIGN_OUT
    }
}

export function userSignOutSuccessAction(): UserSignOutSuccess {
    return {
        type: USER_SIGN_OUT_SUCCESS
    }
}

export function userSignOutFailureAction(errorMessage: string = ''): UserSignOutFailure {
    return {
        type: USER_SIGN_OUT_FAILURE,
        payload: errorMessage
    }
}

export function userTryAuth(): UserTryAuth {
    return {
        type: USER_TRY_AUTH
    }
}

export function userTryAuthFailure(errorMessage: string = ''): UserTryAuthFailure {
    return {
        type: USER_TRY_AUTH_FAILURE,
        payload: errorMessage
    }
}

export function userSetData(payload: Profile): UserSetData {
    return {
        type: USER_SET_INFO,
        payload
    }
}

export function userResetPasswordRequestAction(email: string, history: History): UserResetPasswordRequest {
    return {
        type: USER_PASSWORD_RESET_REQUEST,
        payload: email,
        history
    }
}

export function userResetPasswordConfirmationAction(newPassword: string, confirmCode: string, history: History): UserResetPasswordConfirmation {
    return {
        type: USER_PASSWORD_RESET_CONFIRM_REQUEST,
        payload: {newPassword, confirmCode},
        history
    }
}
