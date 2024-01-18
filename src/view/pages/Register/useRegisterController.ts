import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from '@tanstack/react-query'
import { SignupParams } from "../../../app/services/authService/signup";
import toast from "react-hot-toast";

const schema = z.object({
    name: z.string().min(1, 'O nome é obrigatório.'),
    email: z.string().min(1, 'O e-mail é obrigatório').email('Digite um e-mail válido'),
    password: z.string().min(8, 'A senha é obrigatória e deve conter no mínimo 8 dígitos.')
});

type FormData = z.infer<typeof schema>

export function useRegisterController() {
    const {
        handleSubmit: hookFormHandleSubmit,
        register,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: SignupParams) => {
            return authService.signup(data);
        },
        
    })


    const handleSubmit = hookFormHandleSubmit(async (data) => {
        try {
            await mutateAsync(data);
        } catch {
            toast.error('Ocorreu um erro ao criar a sua conta!')
        }
    })

    return {handleSubmit, register, errors, isPending}
}