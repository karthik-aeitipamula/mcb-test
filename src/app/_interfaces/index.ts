export interface transaction {
    reference: string,
    customerNumber: number,
    customerName: string,
    customerAddress: string,
    customerPhone: string,
    transferAmount: number,
    transferCurrency: string,
    beneficiaryBank: string,
    beneficiaryAccountNumber: string,
    paymentDetails: string
}
export interface List {
  reference?:string;
  customerName?:string;
  transferAmount?: number,
  transferCurrency?: string,
}




