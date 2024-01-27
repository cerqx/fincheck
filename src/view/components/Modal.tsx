import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../app/utils/cn';
import { Cross2Icon } from '@radix-ui/react-icons';

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    title: string;
    rightAction?: React.ReactNode;
}

export function Modal({ isOpen=false, children, title, rightAction }: ModalProps) {
    return (
        <Dialog.Root open={isOpen}>
        <Dialog.Portal>
            <Dialog.Overlay 
            className={cn(
                'fixed inset-0 bg-black/80 backdrop-blur-sm z-50',
                'data-[state=open]:animate-overlayShow'
            )} 
            />

            <Dialog.Content 
            className={cn(
                'bg-white w-full max-w-[400px] rounded-2xl fixed top-1/2 left-1/2 p-6 space-y-10 -translate-x-1/2 -translate-y-1/2 z-[51] outline-none shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
                'data-[state=open]:animate-contentShow'
            )}
            >
                <header 
                    className="h-12 flex items-center justify-between text-gray-800"
                >
                    <button className='w-12 h-12 outline-none'>
                       <Cross2Icon className='w-6 h-6' />
                    </button>

                    <span className='text-lg font-bold tracking-[-1px]'>{title}</span>

                    <div className='w-12 h-12 flex items-center justify-center'>
                        {rightAction}
                    </div>
                </header>

                <div>
                    {children}
                </div>
            </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root> 
    )
}

