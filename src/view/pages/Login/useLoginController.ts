import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../../app/services/authService';
import toast from 'react-hot-toast';
import { SigninParams } from '../../../app/services/authService/signin';
import { useAuth } from '../../../app/hooks/useAuth';

const schema = z.object({
    email: z.string().min(1, 'O e-mail é obrigatório.').email('Informe um e-mail válido.'),
    password: z.string().min(8, 'A senha é obrigatória e deve conter no mínimo 8 dígitos.'),
})

type FormData = z.infer<typeof schema>

export function useLoginController() {
    const {
        register, 
        handleSubmit: hookFormHandleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (params: SigninParams) => {
            return authService.signin(params)
        }
    });

    const { signin } = useAuth();

    const handleSubmit = hookFormHandleSubmit(async (data) => {
        try{
            const { accessToken } = await mutateAsync(data)
            signin(accessToken)
        } catch {
            toast.error('Credenciais inválidas!')
        }
    });

    return { handleSubmit, register, errors, isPending }
}