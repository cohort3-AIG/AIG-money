export interface Register {
    step: number | null,
    phone: string | null,
    phone_confirmed: boolean | null,
    token: string | null,
    wallet_created: boolean | null
}
export interface IRegister extends Register {
    error: string | null,
    success: string | null,
    loading: boolean,
}

export interface IRegisterAction extends Register {
    type: string,
    error: string | null,
    success: string | null,
}