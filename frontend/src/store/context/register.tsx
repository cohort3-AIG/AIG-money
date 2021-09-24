import { useReducer, createContext } from 'react'
import reducer, { initialState } from '../reducers/register'
import axios from 'axios'
import * as actionTypes from '../actionTypes/register'
import { IRegister, IRegisterAction } from '../models/register'
import { REGISTER_URL, HOST_URL } from '../../config/settings'

export const RegisterContext = createContext<IRegister | any>(initialState);

const RegisterContextProvider = (props: any): JSX.Element => {

    const [register, registerDispatch] = useReducer(reducer, initialState)

    const registerStart = (): IRegisterAction => {
        return {
            type: actionTypes.REGISTER_START,
            error: null,
            step: 0,
            success: null,
            phone: null,
            phone_confirmed: null,
            token: null,
            wallet_created: null
        }
    }

    const registerSuccess = (success: string, token: string): IRegisterAction => {
        return {
            type: actionTypes.REGISTER_SUCCESS,
            step: null,
            error: null,
            success,
            phone: null,
            phone_confirmed: null,
            token,
            wallet_created: null
        }
    }

    const registerFail = (error: string): IRegisterAction => {
        return {
            type: actionTypes.REGISTER_FAIL,
            step: null,
            error,
            success: null,
            phone: null,
            phone_confirmed: null,
            token: null,
            wallet_created: null
        }
    }
    const phonePending = (success: string, phone: string): IRegisterAction => {
        return {
            type: actionTypes.PHONE_PENDING,
            step: null,
            error: null,
            success,
            phone,
            phone_confirmed: null,
            token: null,
            wallet_created: null
        }
    }
    const phoneConfirmed = (success: string): IRegisterAction => {
        return {
            type: actionTypes.PHONE_CONFIRMED,
            step: null,
            error: null,
            success,
            phone: null,
            phone_confirmed: true,
            token: null,
            wallet_created: null
        }
    }
    const walletCreated = (success: string): IRegisterAction => {
        return {
            type: actionTypes.WALLET_CREATED,
            step: null,
            error: null,
            success,
            phone: null,
            phone_confirmed: true,
            token: null,
            wallet_created: null
        }
    }
    const phoneValidate = (phone: string) => {
        registerDispatch(registerStart())
        axios.defaults.withCredentials = true
        axios.post(`${HOST_URL}phone`,
            {
                phone_number: phone,
            },
            {
                xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
                withCredentials: true
            }
        ).then(res => {
            if (res.status === 200) {
                registerDispatch(phonePending("Confirmation Code Sent Via SMS", phone))
                localStorage.setItem('phone', phone)
            }
        }).catch(err => {
            if (err.response.data.errors) {
                registerDispatch(registerFail(JSON.stringify(err.response.data.errors)))
            } else {
                registerDispatch(registerFail("Something Went wrong"))
            }
        })
    }
    const phoneConfirmationCode = (code: number, phone_number: string) => {
        registerDispatch(registerStart())
        axios.defaults.withCredentials = true
        axios.post(`${HOST_URL}verify_phone`, {
            code,
            phone_number
        }, {
            xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
            withCredentials: true
        })
            .then(res => {
                if (res.status === 200) {
                    registerDispatch(phoneConfirmed("Phone Confirmation Successfull"))
                }
            })
            .catch(err => {
                if (err.response.data.errors) {
                    registerDispatch(registerFail(JSON.stringify(err.response.data.errors)))
                } else {
                    registerDispatch(registerFail("Phone Confirmation Failed"))
                }
            })
    }
    const signup = (email: string, first_name: string, last_name: string, password: string, password_confirmation: string, phone_number: string) => {
        registerDispatch(registerStart())
        let phone_number1 = localStorage.getItem('phone')
        axios.defaults.withCredentials = true
        axios.post(`${REGISTER_URL}`, {
            first_name,
            last_name,
            email,
            phone_number: phone_number1,
            password,
            password_confirmation
        }, {
            xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
            withCredentials: true
        }).then(res => {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem('email', email)
            registerDispatch(registerSuccess("Account Created Successfully", res.data.token))
        }).catch(err => {
            if (err.response.data.errors) {
                registerDispatch(registerFail(JSON.stringify(err.response.data.errors)))
            } else {
                if (err.response.data.errors) {
                    registerDispatch(registerFail(JSON.stringify(err.response.data.errors)))
                } else {
                    registerDispatch(registerFail("Something Went wrong"))
                }
            }
        })
    }
    const create_wallet = (nationality: string, address_line_1: string, address_line_2: string, city_town_village: string, state_pronvince_region: string, postal_code: number) => {
        registerDispatch(registerStart())
        axios.defaults.withCredentials = true
        const token = localStorage.getItem('token')
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios.post(`${HOST_URL}wallet_create`, {
                nationality,
                date_of_birth: "1998-02-25",
                address_line_1,
                address_line_2,
                city_town_village,
                state_pronvince_region,
                postal_code
            }, config)
                .then(res => {
                    registerDispatch(walletCreated("Wallet Created Successfully"))
                })
                .catch(err => {
                    registerDispatch(registerFail("Something Went wrong"))
                })
        } else {
            registerDispatch(registerFail("You Needed to be Authenticated"))
        }
    }
    return (
        <RegisterContext.Provider value={{ register, phoneValidate, signup, create_wallet, phoneConfirmationCode }}>
            {props.children}
        </RegisterContext.Provider>
    )
}

export default RegisterContextProvider