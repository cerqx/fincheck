import { Modal } from "../../../../components/Modal";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
    const { isNewAccountModalOpen, handleNewAccountModalClose } = useNewAccountModalController();

    return (
        <Modal 
            title="Nova Conta"
            open={isNewAccountModalOpen}
            onClose={handleNewAccountModalClose}
        >
            New Account Modal
        </Modal>
    )
}