import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export function NewTransactionModal() {
    const {
        isNewTransactionModalOpen,
        handleNewTransactionModalClose,
        newTransactionType,
        register,
        control,
        errors,
        handleSubmit,
        accounts,
        categories
    } = useNewTransactionModalController();

    const isExpense = newTransactionType === 'EXPENSE';

    return (
        <Modal 
            title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
            open={isNewTransactionModalOpen}
            onClose={handleNewTransactionModalClose}
        >
            <form onSubmit={handleSubmit}>
                <div>
                    <span className="text-gray-600 text-xs  tracking-[-0.5px]">
                        Valor {isExpense ? 'da despesa' : 'da receita'}
                    </span>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
                        <Controller 
                            control={control}
                            name="value"
                            defaultValue="0"
                            render={({field: { onChange, value }}) => (
                                <InputCurrency 
                                    value={value}
                                    onChange={onChange}
                                    error={errors.value?.message}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                    <Input 
                        type="text" 
                        placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
                        {...register("name")}
                        error={errors.name?.message}
                    />

                   <Controller 
                        control={control}
                        name="categoryId"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <Select
                            onChange={onChange}
                            value={value} 
                            placeholder="Categoria"
                            error={errors.categoryId?.message}
                            options={categories.map(category => (
                                {
                                    label: category.name,
                                    value: category.id
                                }
                            ))}
                        />
                        )}
                   />

                    <Controller 
                        control={control}
                        name="bankAccountId"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <Select 
                            onChange={onChange}
                            value={value}
                            placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                            error={errors.bankAccountId?.message}
                            options={accounts.map(account => ({
                                label: account.name,
                                value: account.id
                            }))}
                        />
                        )}
                    />
                    
                    <Controller 
                        control={control}
                        name="date"
                        render={({ field: { value, onChange } }) => (
                            <DatePickerInput 
                                onChange={onChange}
                                value={value}
                                error={errors.date?.message}
                            />
                        )}
                    />
                </div>

                <Button type="submit" className="w-full mt-6">
                    Criar
                </Button>
            </form>
        </Modal>
    )
}