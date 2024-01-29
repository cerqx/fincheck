import { z } from "zod";
import { useDashboard } from "../../hooks/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { UpdateBankAccountParams } from "../../../../../app/services/bankAccountService/update";
import { useState } from "react";

const schema = z.object({
    initialBalance: z.union([z.string().min(1, 'Saldo inicial é obrigatório.'), z.number() ]),
    name: z.string().min(1, 'O nome da conta é obrigatório.'),
    type: z.enum(['INVESTMENT', 'CHECKING', 'CASH']),
    color: z.string().min(1, 'A cor é obrigatória.')
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
    const {
        isEditAccountModalOpen,
        handleEditAccountModalClose,
        selectedBankAccount
    } = useDashboard();

    const { 
        register, 
        formState: { errors },
        handleSubmit: hookFormHandleSubmit,
        control,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: selectedBankAccount?.name,
            initialBalance: selectedBankAccount?.initialBalance,
            color: selectedBankAccount?.color,
            type: selectedBankAccount?.type,
        }
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const {
            isPending,
            mutateAsync: updateAccount,
        } = useMutation({
            mutationFn: async (data: UpdateBankAccountParams) => {
                return bankAccountsService.update(data);
            }
        });

    const {
        isPending: isPendingDelete,
        mutateAsync: removeAccount,
    } = useMutation({
            mutationFn: async (bankAccountId: string) => {
                return bankAccountsService.remove(bankAccountId);
            }
        });

    const queryClient = useQueryClient();

    const handleSumit = hookFormHandleSubmit(async (data) => {
        try {
            await updateAccount({
                ...data,
                initialBalance: currencyStringToNumber(data.initialBalance),
                id: selectedBankAccount!.id,
            });

            queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
            toast.success('Conta editada com sucesso!');
            handleEditAccountModalClose();
        } catch {
            toast.error('Occ')
        }
    });

    function handleDeleteModalOpen() {
        setIsDeleteModalOpen(true);
    }

    function handleDeleteModalClose() {
        setIsDeleteModalOpen(false);
    }

    async function handleDeleteAccount() {
        try {
            await removeAccount(selectedBankAccount!.id)

            queryClient.invalidateQueries({queryKey: ['bankAccounts']});
            toast.success('Conta deletada com sucesso!');
            handleEditAccountModalClose();
            handleDeleteModalClose();
        } catch {
            toast.error('Erro ao deletar conta!')
        }
    }

    return {
        isEditAccountModalOpen,
        handleEditAccountModalClose,
        register,
        errors,
        handleSumit,
        control,
        isPending,
        isDeleteModalOpen,
        handleDeleteModalOpen,
        handleDeleteModalClose,
        handleDeleteAccount,
        isPendingDelete
    }
}