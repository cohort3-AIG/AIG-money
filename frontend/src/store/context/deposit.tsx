import { useReducer, createContext } from 'react'
import reducer, { initialState } from '../reducers/deposit'
import axios from 'axios'
import * as actionTypes from '../actionTypes/deposit'
import { IDeposit, IDepositAction } from '../models/deposit'
import { HOST_URL, DEBUG } from '../../config/settings'

export const DepositContext = createContext<IDeposit | any>(initialState);

const DepositContextProvider = (props: any): JSX.Element => {

    const [deposit, depositDispatch] = useReducer(reducer, initialState)

    const depositStart = (): IDepositAction => {
        return {
            type: actionTypes.DEPOSIT_START,
            error: null,
            cardNo: null,
            expiry: null,
            ccv: null,
            step: 0,
            success: null
        }
    }

    const depositCardSuccess = (cardNo: string, expiry: string, step: number, ccv: string, success: string): IDepositAction => {
        return {
            type: actionTypes.DEPOSIT_CARD_SUCCESS,
            error: null,
            cardNo,
            expiry,
            ccv,
            step,
            success
        }
    }

    const depositFail = (error: string): IDepositAction => {
        return {
            type: actionTypes.DEPOSIT_FAIL,
            error: error,
            cardNo: null,
            expiry: null,
            ccv: null,
            step: 0,
            success: null
        }
    }

    const depositSuccess = (success: string): IDepositAction => {
        return {
            type: actionTypes.DEPOSIT_SUCCESS,
            error: null,
            cardNo: null,
            expiry: null,
            ccv: null,
            step: 0,
            success
        }
    }

    const insertCard = (cardNo: string, expiry: string, ccv: string) => {
        depositDispatch(depositStart())
        depositDispatch(depositCardSuccess(cardNo, expiry, 1, ccv, "Card entered successfully"))
    }

    const makeDeposit = (
        number: number,
        expiration_month: number,
        expiration_year: number,
        total_amount: number,
        security_code: number,
        first_name: string,
        last_name: string,
        address2: string,
        address1: string,
        postal_code: string,
        locality: string,
        administrative_area: string,
        country: string,
        email: string
    ) => {
        depositDispatch(depositStart())
        const token = localStorage.getItem('token')
        if (DEBUG) {
            axios.defaults.withCredentials = true
        }
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios.post(`${HOST_URL}payment`, {
                number,
                expiration_month,
                expiration_year,
                total_amount,
                security_code,
                first_name,
                last_name,
                address2,
                address1,
                postal_code,
                locality,
                administrative_area,
                country,
                email
            }, config).then(res => {
                console.log(res)
                depositDispatch(depositSuccess("Deposit Added Successfully"))
            }).catch(err => {
                console.log(err)
                if (err.response.data.errors) {
                    depositDispatch(depositFail(JSON.stringify(err.response.data.errors)))
                } else {
                    depositDispatch(depositFail("Deposit Failed"))
                }
            })
        } else {
            depositDispatch(depositFail("You Needed to be Authenticated"))
        }
    }

    return (
        <DepositContext.Provider value={{ deposit, insertCard, makeDeposit }}>
            {props.children}
        </DepositContext.Provider>
    )
}

export default DepositContextProvider