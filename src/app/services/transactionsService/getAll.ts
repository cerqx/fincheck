import { Transaction } from "../../entities/Transaction";
import { httpClient } from "../httpClient";

type TransactionsResponse = Transaction[];

export type TransactionsFiltersProps  = {
    month: number;
    year: number;
    bankAccountId?: string;
    type?: Transaction['type'];
}

export async function getAll(filters: TransactionsFiltersProps) {
    const { data } = await httpClient.get<TransactionsResponse>('transactions', {
        params: filters
    });
    
    return data;
}