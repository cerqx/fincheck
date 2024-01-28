import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../../hooks/useDashboard";

export function useAccountsController() {
    const {
        areValuesVisible,
        toggleValuesVisibility,
        handleNewAccountModalOpen,
    } = useDashboard();

    const windowWidth = useWindowWidth();
    
    const [sliderState, setSliderState] = useState({
        isBeginning: true,
        isEnd: false,
    });

    return {
        sliderState, 
        setSliderState,
        windowWidth,
        areValuesVisible,
        toggleValuesVisibility,
        isLoading: false,
        accounts: [],
        handleNewAccountModalOpen,
    }
}