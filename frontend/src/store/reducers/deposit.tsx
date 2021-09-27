import { updateObject } from '../utility'
import * as actionTypes from '../actionTypes/deposit'
import { IDeposit, IDepositAction } from '../models/deposit'

export const initialState: IDeposit = {
    cardNo: null,
    expiry: null,
    ccv: null,
    step: 0,
    error: null,
    success: null,
    loading: false,
}

const depositStart = (state: IDeposit, action: IDepositAction): IDeposit => {
    return updateObject(state, {
        loading: true,
    })
}

const depositCardSuccess = (state: IDeposit, action: IDepositAction): IDeposit => {
    return updateObject(state, {
        success: action.success,
        loading: false,
        cardNo: action.cardNo,
        expiry: action.expiry,
        step: action.step,
        ccv: action.ccv,
    })
}
const depositSuccess = (state: IDeposit, action: IDepositAction): IDeposit => {
    return updateObject(state, {
        success: action.success,
        loading: false,
        error: null
    })
}

const depositFail = (state: IDeposit, action: IDepositAction): IDeposit => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        success: null
    })
}

const reducer = (state: IDeposit, action: IDepositAction): IDeposit => {
    switch (action.type) {
        case actionTypes.DEPOSIT_START:
            return depositStart(state, action)
        case actionTypes.DEPOSIT_CARD_SUCCESS:
            return depositCardSuccess(state, action)
        case actionTypes.DEPOSIT_FAIL:
            return depositFail(state, action)
        case actionTypes.DEPOSIT_SUCCESS:
            return depositSuccess(state, action)
        default:
            return state
    }
}

export default reducer