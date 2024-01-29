import { httpClient } from "../httpClient";

export interface UpdateBankAccountParams {
    id: string;
    name: string;
    initialBalance: number;
    color: string;
    type: 'CASH' | 'INVESTMENT' | 'CHECKING'
}


export async function update({
    id,
    ...bankAccountParams
}: UpdateBankAccountParams) {
    const { data } = await httpClient.put(`bank-accounts/${id}`, bankAccountParams)

    return data;
}