import { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
    areValuesVisible: boolean;
    toggleValuesVisibility(): void;
    isNewAccountModalOpen: boolean;
    handleNewAccountModalOpen(): void;
    handleNewAccountModalClose(): void;
    isNewTransactionModalOpen: boolean;
    handleNewTransactionModalOpen(type: 'INCOME' | 'EXPENSE'): void;
    handleNewTransactionModalClose(): void;
    newTransactionType: 'INCOME' | 'EXPENSE' | null;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({children}: {children: React.ReactNode }) {
    const [areValuesVisible, setAreValuesVisible ] = useState(true); 
    const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(true);
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null);

    const toggleValuesVisibility = useCallback(() => {
        setAreValuesVisible(prevState => !prevState)
    }, []);

    const handleNewAccountModalOpen = useCallback(() => {
        setIsNewAccountModalOpen(true);
    }, []);

    const handleNewAccountModalClose = useCallback(() => {
        setIsNewAccountModalOpen(false);
    }, []);

    const handleNewTransactionModalOpen = useCallback((type: 'INCOME' | 'EXPENSE') => {
        setNewTransactionType(type);
        setIsNewTransactionModalOpen(true);
    }, []);

    const handleNewTransactionModalClose = useCallback(() => {
        setNewTransactionType(null);
        setIsNewTransactionModalOpen(false);
    }, []);

    return (
        <DashboardContext.Provider 
            value={{ 
                areValuesVisible,
                toggleValuesVisibility,
                isNewAccountModalOpen,
                handleNewAccountModalOpen,
                handleNewAccountModalClose,
                isNewTransactionModalOpen,
                handleNewTransactionModalOpen,
                handleNewTransactionModalClose,
                newTransactionType
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
} 