import { useReducer, createContext } from 'react'
import reducer, { initialState } from '../reducers/deposit'
import axios from 'axios'
import * as actionTypes from '../actionTypes/deposit'
import { IDeposit, IDepositAction } from '../models/deposit'
import { HOST_URL } from '../../config/settings'

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

    const makeDeposit = () => {
        depositDispatch(depositStart())
        axios.post(`${HOST_URL}payment`, {
            "number": "5225110000367222",
            "expiration_month": "02",
            "expiration_year": "2022",
            "total_amount": "50000.0",
            "security_code": "514",
            "first_name": "John",
            "last_name": "Deo",
            "address2": "Address 2",
            "address1": "201 S. Division St.",
            "postal_code": "48104-2201",
            "locality": "Ann Arbor",
            "administrative_area": "MI",
            "country": "US",
            "email": "test@cybs.com"
        }).then(res => {
            depositDispatch(depositSuccess("Deposit Added Successfully"))
        }).catch(err => {
            if (err.response.data.errors) {
                depositDispatch(depositFail(JSON.stringify(err.response.data.errors)))
            } else {
                depositDispatch(depositFail("Deposit Failed"))
            }
        })
    }

    return (
        <DepositContext.Provider value={{ deposit, insertCard, makeDeposit }}>
            {props.children}
        </DepositContext.Provider>
    )
}

export default DepositContextProvider