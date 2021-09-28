import { useReducer, createContext } from 'react'
import reducer, { initialState } from '../reducers/send'
import axios from 'axios'
import * as actionTypes from '../actionTypes/send'
import { ISend, ISendAction } from '../models/send'
import { HOST_URL } from '../../config/settings'

export const SendContext = createContext<ISend | any>(initialState);

const SendContextProvider = (props: any): JSX.Element => {

    const [send, sendDispatch] = useReducer(reducer, initialState)

    const sendStart = (): ISendAction => {
        return {
            type: actionTypes.SEND_START,
            error: null,
            success: null
        }
    }

    const sendFail = (error: string): ISendAction => {
        return {
            type: actionTypes.SEND_FAIL,
            error: error,
            success: null
        }
    }

    const sendSuccess = (success: string): ISendAction => {
        return {
            type: actionTypes.SEND_SUCCESS,
            error: null,
            success
        }
    }

    const sendWallet = (id: string, amount: number) => {
        sendDispatch(sendStart())
        // axios.defaults.withCredentials = true
        const token = localStorage.getItem('token')
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios.post(`${HOST_URL}wallet/transfer`, {
                phone_number: id,
                amount
            }, config)
                .then(res => {
                    sendDispatch(sendSuccess("Amount Sent Successfully"))
                })
                .catch(err => {
                    // console.log(err)
                    sendDispatch(sendFail("Something Went wrong"))
                })
        } else {
            sendDispatch(sendFail("You Needed to be Authenticated"))
        }
    }
    return (
        <SendContext.Provider value={{ send, sendWallet }}>
            {props.children}
        </SendContext.Provider>
    )
}

export default SendContextProvider