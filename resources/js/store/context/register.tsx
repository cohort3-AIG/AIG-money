import React, { useReducer, createContext } from 'react'
import reducer, { initialState } from '../reducers/register'
import axios from 'axios'
import * as actionTypes from '../actionTypes/register'
import { IRegister, IRegisterAction } from '../models/register'
import { REGISTER_URL } from '../../config/settings'

export const RegisterContext = createContext<IRegister | any>(initialState);

const RegisterContextProvider = (props: any): JSX.Element => {

    const [register, registerDispatch] = useReducer(reducer, initialState)

    const authStart = (): IRegisterAction => {
        return {
            type: actionTypes.REGISTER_START,
            error: null,
            step: 0,
            success: null,
            phone: null
        }
    }

    const authSuccess = (email: string, token: string): IRegisterAction => {
        return {
            type: actionTypes.REGISTER_SUCCESS,
            step: 0,
            error: null,
            success: null,
            phone: null
        }
    }

    const authFail = (error: string): IRegisterAction => {
        return {
            type: actionTypes.REGISTER_SUCCESS,
            step: 0,
            error: null,
            success: null,
            phone: null
        }
    }
    return (
        <RegisterContext.Provider value={{ register }}>
            {props.children}
        </RegisterContext.Provider>
    )
}

export default RegisterContextProvider