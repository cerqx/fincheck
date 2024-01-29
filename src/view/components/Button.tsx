import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<'button'>{
    isPending?: boolean;
    variant?: 'danger' | 'ghost';
}

export function Button({className, isPending, variant, disabled, children, ...props}: ButtonProps) {
    return (
        <button 
            {...props}
            disabled={disabled || isPending}
            className={cn(
                "bg-teal-900 hover:bg-teal-800 flex items-center justify-center px-6 h-12 rounded-2xl font-medium text-white transition-all disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed", 
                variant === 'danger' && 'bg-red-900 hover:bg-red-800',
                variant === 'ghost' && 'bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/5',
                className
                )}
        >
            {!isPending && children}
            {isPending && <Spinner className="w-6 h-6"/>}
        </button>
    )
}