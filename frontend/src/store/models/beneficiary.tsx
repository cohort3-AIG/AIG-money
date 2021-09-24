export interface Beneficiary {
 
}
export interface IBeneficiary extends Beneficiary {
    error: string | null,
    success: string | null,
    loading: boolean,
}

export interface IBeneficiaryAction extends Beneficiary {
    type: string,
    error: string | null,
    success: string | null,
}