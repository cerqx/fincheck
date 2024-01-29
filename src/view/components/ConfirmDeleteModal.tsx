import { Button } from "./Button";
import { Modal } from "./Modal";
import { TrashIcon } from "./icons/TrashIcon";

interface ConfirmDeleteModalProps {
    onClose(): void;
    title: string;
    description?: string;
}

export function ConfirmDeleteModal({ title, description, onClose }: ConfirmDeleteModalProps) {
    return (
        <Modal title="Excluir" open onClose={onClose}>
            <div className="flex flex-col items-center text-center gap-6 ">
                <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center">
                    <TrashIcon className="w-6 h-6 text-red-900"/>
                </div>

                <p className="w-[180px] text-gray-800 font-bold tracking-[-0.5px]">
                    {title}
                </p>

                {description && (
                    <p className="tracking-[-0.5px] text-gray-800">
                        {description}
                    </p>
                )}
            </div>
            
            <div className="mt-10 space-y-4">
                <Button className="w-full" variant="danger">
                    Sim, desejo excluir
                </Button>

                <Button className="w-full" variant="ghost" onClick={onClose}>
                    Cancelar
                </Button>
            </div>
        </Modal>
    )
}