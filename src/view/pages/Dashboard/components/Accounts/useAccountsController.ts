import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../../hooks/useDashboard";
import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountService";

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

    console.log('useAccountsController')

    const {data, isFetching} = useQuery({
        queryKey: ['bankAccounts'],
        queryFn: () => bankAccountsService.getAll(),
    });

    const currentBalance = useMemo(() => {
        if(!data) return 0;

        return data.reduce((total, account) => total + account.currentBalance, 0)
    }, [data]);

    return {
        sliderState, 
        setSliderState,
        windowWidth,
        areValuesVisible,
        toggleValuesVisibility,
        isLoading: isFetching,
        accounts: data ?? [],
        handleNewAccountModalOpen,
        currentBalance
    }
}