import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import { useFiltersModal } from "./useFiltersModal";
import { cn } from "../../../../../../app/utils/cn";

interface FiltersModalProps {
    open: boolean;
    onClose(): void;
}

const mockedAccounts = [
    {
        id: '1',
        name: 'Nubank'
    },
    {
        id: '2',
        name: 'Inter'
    },
    {
        id: '3',
        name: 'XP Investimentos'
    },
];

export function FiltersModal({ open, onClose }: FiltersModalProps) {
    const {
        selectedBankAccountId,
        handleSelectBankAccount,
        selectedYear,
        handleChangeYear
    } = useFiltersModal()

    return (
        <Modal open={open} onClose={onClose} title="Filtros">
            <div>
                <span className='text-lg text-gray-800 font-bold tracking-[-1px]'>
                    Conta
                </span>

                <div className="space-y-2 mt-2">
                    {mockedAccounts?.map(account => (
                        <button 
                            className={cn(
                                'text-left text-gray-800 w-full p-2 rounded-2xl hover:bg-gray-50 transition-colors',
                                account.id === selectedBankAccountId && '!bg-gray-200',
                            )} 
                            key={account.id}
                            onClick={() => handleSelectBankAccount(account.id)}
                        >
                            {account.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-10 text-gray-800">
                <span className='text-lg text-gray-800 font-bold tracking-[-1px]'>
                    Ano
                </span>

                <div className="mt-2 w-52 flex items-center justify-between">
                    <button 
                        className="w-12 h-12 flex items-center justify-center"
                        onClick={() => handleChangeYear(-1)}
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>

                    <div className="flex-1 text-center">
                        <span className="text-sm font-medium tracking-[-0.5px]">
                            {selectedYear}
                        </span>
                    </div>

                    <button 
                        className="w-12 h-12 flex items-center justify-center"
                        onClick={() => handleChangeYear(1)}
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <Button className="w-full mt-10">
                Aplicar Filtros
            </Button>
        </Modal>
    )
}