export interface Send {
}
export interface ISend extends Send {
    error: string | null,
    success: string | null,
    loading: boolean,
}

export interface ISendAction extends Send {
    type: string,
    error: string | null,
    success: string | null,
}