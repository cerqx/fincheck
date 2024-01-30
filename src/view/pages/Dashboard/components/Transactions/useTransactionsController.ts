import { useEffect, useState } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionsFiltersProps } from "../../../../../app/services/transactionsService/getAll";

export function useTransactionsController() {
    const { areValuesVisible } = useDashboard();
    const [slideState, setSlideState] = useState({
        isBeginning: true,
        isEnd: false
    })
    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
    const [filters, setFilters] = useState<TransactionsFiltersProps>({
         month: new Date().getMonth(),
         year: new Date().getFullYear(),
    })

    const {
        transactions,
        isLoading,
        isInitialLoading,
        refetchTransactions
    } = useTransactions(filters);

    function handleChangeFilters<TFilter extends keyof TransactionsFiltersProps>(filter: TFilter) {
        return (value: TransactionsFiltersProps[TFilter]) => {
            if(value === filters[filter]) return;

            setFilters(prevState => ({
                ...prevState,
                [filter]: value,
            }))
        }
    }

    function handleApplyFilters({selectedBankAccountId, selectedYear}: {selectedBankAccountId: string | undefined, selectedYear: number}) {
        handleChangeFilters('bankAccountId')(selectedBankAccountId);
        handleChangeFilters('year')(selectedYear);
        setIsFiltersModalOpen(false);

    }

    function handleOpenFiltersModal() {
        setIsFiltersModalOpen(true);
    } 

    function handleCloseFiltersModal() {
        setIsFiltersModalOpen(false);
    }

    useEffect(() => {
        refetchTransactions()
    }, [filters, refetchTransactions])

    return {
        slideState,
        setSlideState,
        areValuesVisible,
        transactions,
        isInitialLoading,
        isLoading,
        isFiltersModalOpen,
        handleOpenFiltersModal,
        handleCloseFiltersModal,
        handleChangeFilters,
        filters,
        handleApplyFilters
    }
}