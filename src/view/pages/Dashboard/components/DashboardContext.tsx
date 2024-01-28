import { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
    areValuesVisible: boolean;
    toggleValuesVisibility(): void;
    isNewAccountModalOpen: boolean;
    handleNewAccountModalOpen(): void;
    handleNewAccountModalClose(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({children}: {children: React.ReactNode }) {
    const [areValuesVisible, setAreValuesVisible ] = useState(true); 
    const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);

    const toggleValuesVisibility = useCallback(() => {
        setAreValuesVisible(prevState => !prevState)
    }, []);

    const handleNewAccountModalOpen = useCallback(() => {
        setIsNewAccountModalOpen(true);
    }, []);

    const handleNewAccountModalClose = useCallback(() => {
        setIsNewAccountModalOpen(false);
    }, []);

    return (
        <DashboardContext.Provider 
            value={{ 
                areValuesVisible,
                toggleValuesVisibility,
                isNewAccountModalOpen,
                handleNewAccountModalOpen,
                handleNewAccountModalClose,
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
} 