import { useState } from "react";

export function useTransactionsController() {
    const [slideState, setSlideState] = useState({
        isBeginning: true,
        isEnd: false
    })

    return {
        slideState,
        setSlideState
    }
}