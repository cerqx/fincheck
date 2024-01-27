import { useState } from "react";
import { useDashboard } from "../../hooks/useDashboard";

export function useTransactionsController() {
    const { areValuesVisible } = useDashboard();
    const [slideState, setSlideState] = useState({
        isBeginning: true,
        isEnd: false
    })

    return {
        slideState,
        setSlideState,
        areValuesVisible,
        isLoading: false,
    }
}