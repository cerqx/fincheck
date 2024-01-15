import { ComponentProps, forwardRef } from "react";

interface InputProps extends ComponentProps<'input'>{
    name: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({placeholder, name, id, ...props}, ref) => {
    const inputId = id ?? name;

  return (
    <div className="relative">
        <input 
            {...props}
            ref={ref}
            name={name }
            id={inputId}
            className="bg-white rounded-lg border border-gray-500 px-3 h-[52px] w-full text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none"
            placeholder=" "
        />

        <label 
            htmlFor={inputId} 
            className="absolute left-[13px] top-2 pointer-events-none text-xs text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
            {placeholder}
        </label>
    </div>
  )
})