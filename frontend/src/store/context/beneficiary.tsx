import { useReducer, createContext } from 'react'
import reducer, { initialState } from '../reducers/beneficiary'
import axios from 'axios'
import * as actionTypes from '../actionTypes/beneficiary'
import { IBeneficiary, IBeneficiaryAction } from '../models/beneficiary'
import { HOST_URL } from '../../config/settings'

export const BeneficiaryContext = createContext<IBeneficiary | any>(initialState);

const BeneficiaryContextProvider = (props: any): JSX.Element => {

    const [beneficiary, beneficiaryDispatch] = useReducer(reducer, initialState)

    const beneficiaryStart = (): IBeneficiaryAction => {
        return {
            type: actionTypes.BENEFICIARY_START,
            error: null,
            name: null,
            phone: null,
            success: null
        }
    }

    const beneficiarySuccess = (name: string, phone: string, success: string): IBeneficiaryAction => {
        return {
            type: actionTypes.BENEFICIARY_SUCCESS,
            error: null,
            name,
            phone,
            success
        }
    }

    const beneficiaryFail = (error: string): IBeneficiaryAction => {
        return {
            type: actionTypes.BENEFICIARY_FAIL,
            error: error,
            name: null,
            phone: null,
            success: null
        }
    }

    const create = (name: string, phone: string) => {
        beneficiaryDispatch(beneficiaryStart())
        axios.post(`${HOST_URL}`, {
            name,
            phone
        }).then(res => {
            beneficiaryDispatch(beneficiarySuccess(name, phone, "Beneficiary Added Successfully"))
        }).catch(err => {
            if (err.response.data.errors) {
                beneficiaryDispatch(beneficiaryFail(JSON.stringify(err.response.data.errors)))
            } else {
                beneficiaryDispatch(beneficiaryFail("Beneficiary Create Failed Failed"))
            }
        })
    }

    return (
        <BeneficiaryContext.Provider value={{ beneficiary, create }}>
            {props.children}
        </BeneficiaryContext.Provider>
    )
}

export default BeneficiaryContextProvider