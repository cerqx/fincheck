import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { Transaction } from "../../../../../app/entities/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateTransactionParams } from "../../../../../app/services/transactionsService/update";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast"; 

const schema = z.object({
    value: z.union([
        z.string().min(1, 'O valor não pode ser vazio!'),
        z.number().min(1, 'O valor não pode ser vazio!')
    ]),
    name: z.string().min(1, 'Informe o nome.'),
    categoryId: z.string().min(1, 'Informe a categoria.'),
    bankAccountId : z.string().min(1, 'Informe a conta.'),
    date: z.date() 
})

type FormData = z.infer<typeof schema>

export function useEditTransactionModalController(
    transaction: Transaction  | null,
    onClose: () => void
    ) {

    const {
        register,
        formState: { errors },
        control,
        handleSubmit: hookFormHandleSubmit,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            bankAccountId: transaction?.bankAccountId,
            categoryId: transaction?.categoryId,
            value: transaction?.value,
            name: transaction?.name,
            date: transaction ? new Date(transaction?.date) : new Date(),
        }
    })

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: UpdateTransactionParams) => {
            return transactionsService.update(data)
        }
    })

    const {
        isPending: isPendingDelete,
        mutateAsync: removeTransaction,
    } = useMutation({
            mutationFn: async (transactionId: string) => {
                return transactionsService.remove(transactionId);
            }
        });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 

    function handleOpenDeleteModal() {
        setIsDeleteModalOpen(true)
    }

    function handleCloseDeleteModal() {
        setIsDeleteModalOpen(false)
    }

    const queryClient = useQueryClient();

    const { accounts } = useBankAccounts();
    const { categories: categoriesList } = useCategories();

    const handleSubmit = hookFormHandleSubmit(async data => {
        try {
            const payload = {
                ...data,
                id: transaction!.id,
                value: currencyStringToNumber(data.value),
                type: transaction!.type,
                date: data.date.toISOString()
            }

            await mutateAsync(payload)

            onClose()
            queryClient.invalidateQueries({ queryKey: ['transactions']})
            queryClient.invalidateQueries({ queryKey: ['bankAccounts']})
            toast.success(
                transaction!.type === 'EXPENSE' ? 'Despesa editada com sucesso!' : 'Receita editada com sucesso!'
            )
        } catch {
            toast.error(
                transaction!.type === 'EXPENSE' ? 'Erro ao editar despesa!' : 'Erro ao editar receita!'
            )
        }
    })

    const categories = useMemo(() => {
        return categoriesList.filter(category => category.type === transaction?.type)
    }, [categoriesList, transaction?.type])

    async function handleDeleteTransaction() {
        try {
            await removeTransaction(transaction!.id)

            queryClient.invalidateQueries({queryKey: ['transactions']});
            toast.success(`${transaction?.type === 'EXPENSE' ? 'Despesa' : 'Receita'} deletada com sucesso!`);
            onClose() 
        } catch {
            toast.error(`Erro ao deletar ${transaction?.type === 'EXPENSE' ? 'despesa' : 'receita'}!`)
        }
    }

    return {
        register,
        errors,
        control,
        handleSubmit,
        accounts,
        categories,
        isPending,
        isDeleteModalOpen,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        isPendingDelete,
        handleDeleteTransaction
    }
}