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
            success: null
        }
    }

    const beneficiarySuccess = (success: string): IBeneficiaryAction => {
        return {
            type: actionTypes.BENEFICIARY_SUCCESS,
            error: null,
            success
        }
    }

    const beneficiaryFail = (error: string): IBeneficiaryAction => {
        return {
            type: actionTypes.BENEFICIARY_FAIL,
            error: error,
            success: null
        }
    }

    const create = (phone: string, first_name: string, last_name: string) => {
        beneficiaryDispatch(beneficiaryStart())
        // axios.defaults.withCredentials = true
        const token = localStorage.getItem('token')
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios.post(`${HOST_URL}beneficiary/create`, {
                first_name,
                last_name,
                phone_number:phone
            }, config).then(res => {
                beneficiaryDispatch(beneficiarySuccess("Beneficiary Added Successfully"))
            }).catch(err => {
                if (err.response.data.errors) {
                    beneficiaryDispatch(beneficiaryFail(JSON.stringify(err.response.data.errors)))
                } else {
                    beneficiaryDispatch(beneficiaryFail("Beneficiary Create Failed Failed"))
                }
            })
        } else {
            beneficiaryDispatch(beneficiaryFail("You Needed to be Authenticated"))
        }
    }

    return (
        <BeneficiaryContext.Provider value={{ beneficiary, create }}>
            {props.children}
        </BeneficiaryContext.Provider>
    )
}

export default BeneficiaryContextProvider