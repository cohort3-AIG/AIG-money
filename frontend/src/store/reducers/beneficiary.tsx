import { updateObject } from '../utility'
import * as actionTypes from '../actionTypes/beneficiary'
import { IBeneficiary, IBeneficiaryAction } from '../models/beneficiary'

export const initialState: IBeneficiary = {
    error: null,
    success: null,
    loading: false,
}

const beneficiaryStart = (state: IBeneficiary, action: IBeneficiaryAction): IBeneficiary => {
    return updateObject(state, {
        loading: true,
    })
}

const beneficiarySuccess = (state: IBeneficiary, action: IBeneficiaryAction): IBeneficiary => {
    return updateObject(state, {
        success: action.success,
        loading: false,
    })
}

const beneficiaryFail = (state: IBeneficiary, action: IBeneficiaryAction): IBeneficiary => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const reducer = (state: IBeneficiary, action: IBeneficiaryAction): IBeneficiary => {
    switch (action.type) {
        case actionTypes.BENEFICIARY_START:
            return beneficiaryStart(state, action)
        case actionTypes.BENEFICIARY_SUCCESS:
            return beneficiarySuccess(state, action)
        case actionTypes.BENEFICIARY_FAIL:
            return beneficiaryFail(state, action)
        default:
            return state
    }
}

export default reducer