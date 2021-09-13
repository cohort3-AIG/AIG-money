import { updateObject } from '../utility'
import * as actionTypes from '../actionTypes/register'
import { IRegister, IRegisterAction } from '../models/register'

export const initialState: IRegister = {
    step: 0,
    phone: null,
    error: null,
    success: null,
    loading: false,
}

const signUpStart = (state: IRegister, action: IRegisterAction) => {
    return updateObject(state, {
        loading: true,
    })
}

const signUpSuccess = (state: IRegister, action: IRegisterAction) => {
    return updateObject(state, {
        error: null,
        success: action.success,
        loading: false,
    })
}

const authFail = (state: IRegister, action: IRegisterAction) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const authLogout = (state: IRegister, action: IRegisterAction) => {
    return updateObject(state, {
        token: null,
        email: null,
        error: null,
        loading: false,
    })
}

const reducer = (state: IRegister, action: IRegisterAction): IRegister => {
    switch (action.type) {
        // case actionTypes.AUTH_START:
        //     return authStart(state, action)
        // case actionTypes.AUTH_SUCCESS:
        //     return authSuccess(state, action)
        // case actionTypes.AUTH_FAIL:
        //     return authFail(state, action)
        // case actionTypes.AUTH_LOGOUT:
        //     return authLogout(state, action)
        default:
            return state
    }
}

export default reducer