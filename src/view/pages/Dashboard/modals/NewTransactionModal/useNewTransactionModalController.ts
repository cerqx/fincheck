import { z } from "zod";
import { useDashboard } from "../../hooks/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";

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
        handleSubmit: hookFormHandleSubmit
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const handleSubmit = hookFormHandleSubmit((data) => {
        console.log({data});
    })

    const { accounts } = useBankAccounts();

    return {
        isNewTransactionModalOpen,
        handleNewTransactionModalOpen,
        handleNewTransactionModalClose,
        newTransactionType,
        register,
        errors,
        control,
        handleSubmit,
        accounts
    }
}