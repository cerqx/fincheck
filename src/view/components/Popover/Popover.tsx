import * as RdxPopover from '@radix-ui/react-popover';
import { cn } from '../../../app/utils/cn';

export function PopoverRoot({children}: {children: React.ReactNode}) {
    return (
        <RdxPopover.Root>
            {children}
        </RdxPopover.Root>
    )
}

export function PopoverTrigger({children}: {children: React.ReactNode}) {
    return (
        <RdxPopover.Trigger asChild>
            {children}
        </RdxPopover.Trigger>
    )
}

interface PopoverContentProps {
    children: React.ReactNode;
    className?: string;
}

export function PopoverContent({ children, className }: PopoverContentProps) {
    return (
        <RdxPopover.Portal>
            <RdxPopover.Content
                className={cn(
                    'bg-white rounded-2xl space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-50 p-4',
                    'data-[side=bottom]:animate-slideUpAndFade',
                    'data-[side=top]:animate-slideDownAndFade',
                    className
                )}
            >
                { children }
            </RdxPopover.Content>
        </RdxPopover.Portal>
    )
}

