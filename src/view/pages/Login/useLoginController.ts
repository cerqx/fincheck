import { useForm } from 'react-hook-form'

interface FormData{
    email: string;
    password: string;
}

export function useLoginController() {
    const {
        register, 
        handleSubmit: hookFormHandleSubmit,
    } = useForm<FormData>();

    const handleSubmit = hookFormHandleSubmit((data) => {
        console.log({data})
    });

    return { handleSubmit, register }
}