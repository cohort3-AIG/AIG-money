export interface User {
    token: string | null,
    email: string | null,
}
export interface IAuth extends User {
    error: string | null,
    loading: boolean,
}

export interface IAuthAction extends User {
    type: string,
    error: string | null,
}