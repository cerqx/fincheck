import { createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../../app/entities/BankAccount";

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
    isEditAccountModalOpen: boolean;
    handleEditAccountModalOpen(bankAccount: BankAccount): void;
    handleEditAccountModalClose(): void;
    selectedBankAccount: null | BankAccount;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({children}: {children: React.ReactNode }) {
    const [areValuesVisible, setAreValuesVisible ] = useState(true); 
    const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null);
    const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
    const [selectedBankAccount, setSelectedBankAccount] = useState<null | BankAccount>(null);
    
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

    const handleEditAccountModalOpen = useCallback((bankAccount: BankAccount) => {
        setSelectedBankAccount(bankAccount);
        setIsEditAccountModalOpen(true);
    }, []);

    const handleEditAccountModalClose = useCallback(() => {
        setSelectedBankAccount(null)
        setIsEditAccountModalOpen(false);
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
                newTransactionType,
                isEditAccountModalOpen,
                handleEditAccountModalOpen,
                handleEditAccountModalClose,
                selectedBankAccount 
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
} 