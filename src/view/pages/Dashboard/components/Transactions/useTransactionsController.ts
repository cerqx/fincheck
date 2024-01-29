import { useState } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";

export function useTransactionsController() {
    const { areValuesVisible } = useDashboard();
    const [slideState, setSlideState] = useState({
        isBeginning: true,
        isEnd: false
    })
    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

    const { transactions, isLoading, isInitialLoading } = useTransactions();

    function handleOpenFiltersModal() {
        setIsFiltersModalOpen(true);
    }

    function handleCloseFiltersModal() {
        setIsFiltersModalOpen(false);
    }

    return {
        slideState,
        setSlideState,
        areValuesVisible,
        transactions,
        isInitialLoading,
        isLoading,
        isFiltersModalOpen,
        handleOpenFiltersModal,
        handleCloseFiltersModal
    }
}