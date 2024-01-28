import { ColorsDropdowInput } from "../../../../components/ColorsDropdowInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
    const { isNewAccountModalOpen, handleNewAccountModalClose } = useNewAccountModalController();

    return (
        <Modal 
            title="Nova Conta"
            open={isNewAccountModalOpen}
            onClose={handleNewAccountModalClose}
        >
            <form>
                <div>
                    <span className="text-gray-600 text-xs  tracking-[-0.5px]">Saldo</span>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
                        <InputCurrency />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                    <Input 
                        type="text" 
                        name="name"
                        placeholder="Nome da conta"
                    />

                    <Select 
                        placeholder="Tipo"
                        options={[
                            {
                                value: 'CHECKING',
                                label: 'Conta Corrente'
                            },
                            {
                                value: 'INVESTMENT',
                                label: 'Investimentos'
                            },
                            {
                                value: 'CASH',
                                label: 'Dinheiro Físico'
                            },
                        ]}
                    />

                    <ColorsDropdowInput />
                </div>
            </form>
        </Modal>
    )
}