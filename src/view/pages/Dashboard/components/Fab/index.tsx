import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";

export function Fab() {
    return (
        <div className="fixed bottom-4 right-4">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <button 
                        className="bg-teal-900 h-12 w-12 text-white rounded-full flex items-center justify-center"
                    >
                        <PlusIcon className="w-5 h-5" />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content className="mb-1">
                    <DropdownMenu.Item className="gap-2">
                        <CategoryIcon type="expense" />

                        Nova Despesa
                    </DropdownMenu.Item>

                    <DropdownMenu.Item className="gap-2">
                        <CategoryIcon type="income" />

                        Nova Receita
                    </DropdownMenu.Item>

                    <DropdownMenu.Item className="gap-2">
                        <BankAccountIcon />

                        Nova Conta
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    )
}