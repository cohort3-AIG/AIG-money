import { useReducer, createContext } from 'react'
import reducer, { initialState } from '../reducers/auth'
import axios from 'axios'
import * as actionTypes from '../actionTypes/auth'
import { IAuth, IAuthAction } from '../models/auth'
import { BASE_URL, LOGIN_URL, HOST_URL, DEBUG } from '../../config/settings'

export const AuthContext = createContext<IAuth | any>(initialState);

const AuthContextProvider = (props: any): JSX.Element => {

    const [auth, authDispatch] = useReducer(reducer, initialState)

    const authStart = (): IAuthAction => {
        return {
            type: actionTypes.AUTH_START,
            error: null,
            token: null,
            email: null,
            success: null
        }
    }

    const authSuccess = (email: string, token: string, success: string): IAuthAction => {
        return {
            type: actionTypes.AUTH_SUCCESS,
            token: token,
            email: email,
            error: null,
            success
        }
    }

    const authFail = (error: string): IAuthAction => {
        return {
            type: actionTypes.AUTH_FAIL,
            error: error,
            email: null,
            token: null,
            success: null
        }
    }
    const authLogoutSuccess = (success: string): IAuthAction => {
        return {
            type: actionTypes.AUTH_LOGOUT,
            email: null,
            error: null,
            token: null,
            success
        }
    }
    const authLoggedOut = (): IAuthAction => {
        return {
            type: actionTypes.AUTH_LOGGED_OUT,
            email: null,
            error: null,
            token: null,
            success: null
        }
    }
    const login = (email: string, password: string) => {
        authDispatch(authStart())
        if (DEBUG) {
            axios.defaults.withCredentials = true
        }
        axios.post(`${LOGIN_URL}`, {
            email: email,
            password: password
        }).then(res => {
            const token = res.data.token;
            if (res.data.token) {
                localStorage.setItem("token", token)
                localStorage.setItem('email', email)
                authDispatch(authSuccess(email, token, "Logged In Successfully"))
            } else {
                authDispatch(authFail(res.data.message))
            }
        }).catch(err => {
            authDispatch(authFail(err))
        })
    }
    const logout = () => {

        localStorage.removeItem('token')
        localStorage.removeItem('email')
        if (DEBUG) {
            axios.defaults.withCredentials = true
        }
        axios.post(`${HOST_URL}logout`).then(res => {
            authDispatch(authLogoutSuccess("Logged Out Successfully"))
        }).catch(err => {
            authDispatch(authFail("Failed to logout"))
        })
    }

    const getCsrfCookie = () => {
        axios.get(`${BASE_URL}sanctum/csrf-cookie`).then(res => {
            // console.log("from context")
            // console.log(res)
        })
    }
    const authCheckState = () => {
        authDispatch(authStart())
        const token: string = JSON.stringify(localStorage.getItem("token"))
        const email: string = JSON.stringify(localStorage.getItem('email'))
        if (token === undefined) {
            authDispatch(authLoggedOut())
        } else {
            authDispatch(authSuccess(email, token, "Welcome Back"))
        }
    }

    return (
        <AuthContext.Provider value={{ auth, login, logout, authCheckState, getCsrfCookie }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider