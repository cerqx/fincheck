import { z } from "zod";
import { useDashboard } from "../../hooks/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { CreateTransactionParams } from "../../../../../app/services/transactionsService/create";
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

export function useNewTransactionModalController() {
    const {
        isNewTransactionModalOpen,
        handleNewTransactionModalOpen,
        handleNewTransactionModalClose,
        newTransactionType
    } = useDashboard();

    const {
        register,
        formState: { errors },
        control,
        handleSubmit: hookFormHandleSubmit,
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: CreateTransactionParams) => {
            return transactionsService.create(data);
        }
    })

    const { accounts } = useBankAccounts();
    const { categories: categoriesList } = useCategories();

    const queryClient = useQueryClient();

    const handleSubmit = hookFormHandleSubmit(async (data) => {
        try {
            const payload = {
                ...data,
                value: currencyStringToNumber(data.value),
                type: newTransactionType!
            }

            await mutateAsync(payload)

            handleNewTransactionModalClose()
            queryClient.invalidateQueries({ queryKey: ['transactions']})
            queryClient.invalidateQueries({ queryKey: ['bankAccounts']})
            reset(
                {
                    name: "",
                    bankAccountId: "",
                    categoryId: "",
                    date: new Date(),
                    value: "0"
                }
            )
            toast.success(
                newTransactionType === 'EXPENSE' ? 'Despesa cadastrada com sucesso!' : 'Receita cadastrada com sucesso!'
            )
        } catch {
            toast.error(
                newTransactionType === 'EXPENSE' ? 'Erro ao criar despesa!' : 'Erro ao criar receita!'
            )
        }
        
    })

    const categories = useMemo(() => {
        return categoriesList.filter(category => category.type === newTransactionType)
    }, [categoriesList, newTransactionType])

    return {
        isNewTransactionModalOpen,
        handleNewTransactionModalOpen,
        handleNewTransactionModalClose,
        newTransactionType,
        register,
        errors,
        control,
        handleSubmit,
        accounts,
        categories,
        isPending
    }
}