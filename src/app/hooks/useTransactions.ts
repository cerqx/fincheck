import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactionsService";
import { TransactionsFiltersProps } from "../services/transactionsService/getAll";

export function useTransactions(filters: TransactionsFiltersProps) {
    const { data, isFetching, isLoading, refetch } = useQuery({
        queryKey: ['transactions'],
        queryFn:  () => transactionsService.getAll(filters)
    })

    return {
        transactions: data ?? [],
        isLoading: isFetching,
        isInitialLoading: isLoading,
        refetchTransactions: refetch,
    }
}