import { updateObject } from '../utility'
import * as actionTypes from '../actionTypes/register'
import { IRegister, IRegisterAction } from '../models/register'

export const initialState: IRegister = {
    step: 0,
    phone: null,
    error: null,
    success: null,
    loading: false,
    phone_confirmed: false,
    token: null,
    wallet_created: false
}

const registerStart = (state: IRegister, action: IRegisterAction) => {
    return updateObject(state, {
        loading: true,
    })
}

const signUpSuccess = (state: IRegister, action: IRegisterAction) => {
    return updateObject(state, {
        error: null,
        success: action.success,
        loading: false,
        token: action.token,
        step: 2
    })
}

const registerFail = (state: IRegister, action: IRegisterAction) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}
const phonePending = (state: IRegister, action: IRegisterAction): IRegister => {
    return updateObject(
        state, {
        loading: false,
        success: action.success,
        phone: action.phone
    })
}
const phoneConfirmed = (state: IRegister, action: IRegisterAction): IRegister => {
    return updateObject(
        state, {
        loading: false,
        success: action.success,
        step: 1,
        phone_confirmed: true
    })
}
const walletCreated = (state: IRegister, action: IRegisterAction): IRegister => {
    return updateObject(
        state, {
        loading: false,
        success: action.success,
        wallet_created: true,
    })
}
const reducer = (state: IRegister, action: IRegisterAction): IRegister => {
    switch (action.type) {
        case actionTypes.REGISTER_START:
            return registerStart(state, action);
        case actionTypes.PHONE_PENDING:
            return phonePending(state, action)
        case actionTypes.REGISTER_FAIL:
            return registerFail(state, action)
        case actionTypes.PHONE_CONFIRMED:
            return phoneConfirmed(state, action)
        case actionTypes.REGISTER_SUCCESS:
            return signUpSuccess(state, action);
        case actionTypes.WALLET_CREATED:
            return walletCreated(state, action);
        default:
            return state
    }
}

export default reducer