import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

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

    const handleSubmit = hookFormHandleSubmit((data) => {
        console.log({data})
    });

    return { handleSubmit, register, errors }
}