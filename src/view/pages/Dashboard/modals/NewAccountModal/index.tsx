import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdowInput } from "../../../../components/ColorsDropdowInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
    const {
        isNewAccountModalOpen,
        handleNewAccountModalClose,
        register,
        errors,
        handleSumit,
        control,
        isPending
    } = useNewAccountModalController();

    return (
        <Modal 
            title="Nova Conta"
            open={isNewAccountModalOpen}
            onClose={handleNewAccountModalClose}
        >
            <form onSubmit={handleSumit}>
                <div>
                    <span className="text-gray-600 text-xs  tracking-[-0.5px]">Saldo inicial</span>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
                        
                        <Controller
                            control={control}
                            name="initialBalance" 
                            defaultValue="0"
                            render={({ field: { onChange, value } }) => (
                                <InputCurrency 
                                    error={errors.initialBalance?.message}
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                    <Input 
                        type="text" 
                        placeholder="Nome da conta"
                        error={errors.name?.message}
                        {...register('name')}
                    />

                   <Controller 
                   control={control}
                    name="type"
                    defaultValue="INVESTMENT"
                    render={({ field: { onChange, value } }) => (
                        <Select 
                            placeholder="Tipo"
                            error={errors.type?.message}
                            onChange={onChange}
                            value={value}
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
                    )}
                   />

                    <Controller 
                        control={control}
                        name="color"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <ColorsDropdowInput
                                onChange={onChange}
                                value={value} 
                                error={errors.color?.message}
                            />
                        )}
                    />
                </div>

                <Button type="submit" className="w-full mt-6" isPending={isPending}>
                    Criar
                </Button>
            </form>
        </Modal>
    )
}