import { useDashboard } from "../../hooks/useDashboard";

export function useNewAccountModalController() {
    const { isNewAccountModalOpen, handleNewAccountModalClose } = useDashboard();

    return {
        isNewAccountModalOpen,
        handleNewAccountModalClose
    }
}