import { useState } from "react";
import { useDashboard } from "../../hooks/useDashboard";

export function useTransactionsController() {
    const { areValuesVisible } = useDashboard();
    const [slideState, setSlideState] = useState({
        isBeginning: true,
        isEnd: false
    })
    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

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
        transactions: [],
        isInitialLoading: false,
        isLoading: false,
        isFiltersModalOpen,
        handleOpenFiltersModal,
        handleCloseFiltersModal
    }
}