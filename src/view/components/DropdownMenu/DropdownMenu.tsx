import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';

export function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
    return (
        <RdxDropdownMenu.Root>
            { children }
        </RdxDropdownMenu.Root>
    )
}

export function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
    return (
        <RdxDropdownMenu.Trigger className='outline-none'>
            { children }
        </RdxDropdownMenu.Trigger>
    )
}

export function DropdownMenuContent({ children }: { children: React.ReactNode }) {
    return (
        <RdxDropdownMenu.Portal>
            <RdxDropdownMenu.Content 
                className='bg-white rounded-2xl p-2 space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]'
            >
                { children }
            </RdxDropdownMenu.Content>
        </RdxDropdownMenu.Portal>
    )
}

export function DropdownMenuItem({ children }: { children: React.ReactNode }) {
    return (
        <RdxDropdownMenu.Item 
            className='min-h-[48px] p-4 text-gray-800 text-sm outline-none rounded-2xl transition-colors cursor-pointer flex items-center hover:bg-gray-50'
        >
            { children }
        </RdxDropdownMenu.Item>
    )
}