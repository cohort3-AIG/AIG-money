import { updateObject } from '../utility'
import * as actionTypes from '../actionTypes/send'
import { ISend, ISendAction } from '../models/send'

export const initialState: ISend = {
    error: null,
    success: null,
    loading: false,
}

const sendStart = (state: ISend, action: ISendAction): ISend => {
    return updateObject(state, {
        loading: true,
    })
}
const sendSuccess = (state: ISend, action: ISendAction): ISend => {
    return updateObject(state, {
        success: action.success,
        loading: false,
    })
}

const sendFail = (state: ISend, action: ISendAction): ISend => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const reducer = (state: ISend, action: ISendAction): ISend => {
    switch (action.type) {
        case actionTypes.SEND_START:
            return sendStart(state, action)
        case actionTypes.SEND_FAIL:
            return sendFail(state, action)
        case actionTypes.SEND_SUCCESS:
            return sendSuccess(state, action)
        default:
            return state
    }
}

export default reducer