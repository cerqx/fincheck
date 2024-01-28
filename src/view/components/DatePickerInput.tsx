import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { useState } from "react";
import { formatDate } from "../../app/utils/formatDate";
import { Popover } from "./Popover";
import { DatePicker } from "./DatePicker";

interface DatePickerInputProps {
    error?: string;
    className?: string;
}


export function DatePickerInput({ className, error }: DatePickerInputProps) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div>
            <Popover.Root>
                <Popover.Trigger>
                        <button 
                            type="button"
                            className={cn(
                                "bg-white rounded-lg border border-gray-500 px-3 h-[52px] w-full text-gray-7 00 focus:border-gray-800 transition-all outline-none text-left pt-4 relative",
                                error && '!border-red-900', //o ! na frente é igual ao !important no CSS, ou seja, ele tem prioridade
                                className
                            )}
                        >
                            <span className="text-gray-700 text-xs absolute left-[13px] top-2 pointer-events-none">Data</span>
                            <span>{formatDate(selectedDate)}</span>

                        </button>
                </Popover.Trigger>

                <Popover.Content className="z-[99]">
                    <DatePicker value={selectedDate} onChange={date => setSelectedDate(date)}/>
                </Popover.Content>
            </Popover.Root>

            {error && (
                <div className="flex items-center mt-2 gap-2 text-red-900">
                    <CrossCircledIcon />
                    <span className="text-xs">
                        {error}
                    </span>
                </div>
            )}

        </div>
    )
}