import { ComponentProps } from "react";

interface InputProps extends ComponentProps<'input'>{}

export function Input({placeholder, ...props}: InputProps) {
  return (
    <div className="relative">
        <input 
            {...props}
            className="bg-white rounded-lg border border-gray-500 px-3 h-[52px] w-full text-gray-800"
        />

        <label className="absolute left-0">
            {placeholder}
        </label>
    </div>
  )
}