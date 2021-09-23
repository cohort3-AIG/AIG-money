export interface Deposit {
    cardNo: string | null,
    expiry: string | null,
    ccv: string | null,
    step: number
}
export interface IDeposit extends Deposit {
    error: string | null,
    success: string | null,
    loading: boolean,
}

export interface IDepositAction extends Deposit {
    type: string,
    error: string | null,
    success: string | null,
}