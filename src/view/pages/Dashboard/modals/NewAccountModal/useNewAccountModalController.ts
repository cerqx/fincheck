import { z } from "zod";
import { useDashboard } from "../../hooks/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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

export function useNewAccountModalController() {
    const {
        isNewAccountModalOpen,
        handleNewAccountModalClose
    } = useDashboard();

    const { 
        register, 
        formState: { errors },
        handleSubmit: hookFormHandleSubmit,
        control
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (data: BankAccountParams) => {
            return bankAccountsService.create(data);
        }
    });

    const handleSumit = hookFormHandleSubmit(async (data) => {
        try {
            await mutateAsync({
                ...data,
                initialBalance: currencyStringToNumber(data.initialBalance),
            });

            toast.success('Conta cadastrada com sucesso!');
            handleNewAccountModalClose();
        } catch {
            toast.error('Occ')
        }
    });

    return {
        isNewAccountModalOpen,
        handleNewAccountModalClose,
        register,
        errors,
        handleSumit,
        control,
        isPending
    }
}