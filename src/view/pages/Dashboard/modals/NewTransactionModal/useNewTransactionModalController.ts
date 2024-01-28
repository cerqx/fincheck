import { useDashboard } from "../../hooks/useDashboard";

export function useNewTransactionModalController() {
    const {
        isNewTransactionModalOpen,
        handleNewTransactionModalOpen,
        handleNewTransactionModalClose,
        newTransactionType
    } = useDashboard();

    return {
        isNewTransactionModalOpen,
        handleNewTransactionModalOpen,
        handleNewTransactionModalClose,
        newTransactionType
    }
}