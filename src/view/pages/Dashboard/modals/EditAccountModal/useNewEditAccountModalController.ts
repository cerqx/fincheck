import { z } from "zod";
import { useDashboard } from "../../hooks/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountService";
import { BankAccountParams } from "../../../../../app/services/bankAccountService/create";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";

const schema = z.object({
    initialBalance: z.string().min(1, 'Saldo inicial é obrigatório.'),
    name: z.string().min(1, 'O nome da conta é obrigatório.'),
    type: z.enum(['INVESTMENT', 'CHECKING', 'CASH']),
    color: z.string().min(1, 'A cor é obrigatória.')
});

type FormData = z.infer<typeof schema>;

export function useNewEditAccountModalController() {
    const {
        isEditAccountModalOpen,
        handleEditAccountModalClose,
    } = useDashboard();

    const { 
        register, 
        formState: { errors },
        handleSubmit: hookFormHandleSubmit,
        control,
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (data: BankAccountParams) => {
            return bankAccountsService.create(data);
        }
    });

    const queryClient = useQueryClient();

    const handleSumit = hookFormHandleSubmit(async (data) => {
        try {
            await mutateAsync({
                ...data,
                initialBalance: currencyStringToNumber(data.initialBalance),
            });

            queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
            toast.success('Conta cadastrada com sucesso!');
            handleEditAccountModalClose();
            reset({
                initialBalance: "0",
                name:"",
                type: "INVESTMENT",
                color: "",
            });
        } catch {
            toast.error('Occ')
        }
    });

    return {
        isEditAccountModalOpen,
        handleEditAccountModalClose,
        register,
        errors,
        handleSumit,
        control,
        isPending
    }
}