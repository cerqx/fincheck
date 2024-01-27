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
        <RdxDropdownMenu.Trigger>
            { children }
        </RdxDropdownMenu.Trigger>
    )
}

export function DropdownMenuContent({ children }: { children: React.ReactNode }) {
    return (
        <RdxDropdownMenu.Portal>
            <RdxDropdownMenu.Content className='bg-red-500'>
                { children }
            </RdxDropdownMenu.Content>
        </RdxDropdownMenu.Portal>
    )
}

export function DropdownMenuItem({ children }: { children: React.ReactNode }) {
    return (
        <RdxDropdownMenu.Item>
            { children }
        </RdxDropdownMenu.Item>
    )
}