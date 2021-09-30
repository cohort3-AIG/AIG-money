import { updateObject } from '../utility'
import * as actionTypes from '../actionTypes/auth'
import { IAuth, IAuthAction } from '../models/auth'

export const initialState: IAuth = {
    token: null,
    email: null,
    error: null,
    loading: false,
    success: null
}

const authStart = (state: IAuth, action: IAuthAction) => {
    return updateObject(state, {
        error: null,
        loading: true,
        token: null,
        email: null
    })
}

const authSuccess = (state: IAuth, action: IAuthAction) => {
    return updateObject(state, {
        error: null,
        token: action.token,
        email: action.email,
        loading: false,
        success: action.success
    })
}

const authFail = (state: IAuth, action: IAuthAction) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        token: null,
        email: null,
        success: null
    })
}

const authLogout = (state: IAuth, action: IAuthAction) => {
    return updateObject(state, {
        token: null,
        email: null,
        error: null,
        loading: false,
        success: action.success
    })
}
const authLoggedOut = (state: IAuth, action: IAuthAction) => {
    return updateObject(state, {
        token: null,
        email: null,
        error: null,
        loading: false,
        success: null
    })
}

const reducer = (state: IAuth, action: IAuthAction): IAuth => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAIL:
            return authFail(state, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action)
        case actionTypes.AUTH_LOGGED_OUT:
            return authLoggedOut(state, action)
        default:
            return state
    }
}

export default reducer