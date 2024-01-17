import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { authService } from "../../../app/services/authService";

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

    const handleSubmit = hookFormHandleSubmit(async (data) => {
        const { accessToken } = await authService.signup(data);
        console.log({accessToken})
    })

    return {handleSubmit, register, errors}
}