export interface Register {
    step: number,
    phone: string | null,
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