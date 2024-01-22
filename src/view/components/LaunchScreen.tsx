import { Logo } from "./Logo";
import { Spinner } from "./Spinner";

export function LaunchScreen() {
    return (
        <div className="w-full h-full flex items-center justify-center fixed bg-teal-900">
            <div className="flex flex-col items-center gap-4">
                <Logo className="h-10 text-white" />
                <Spinner className="text-teal-900 fill-white" />
            </div>
        </div>
    )
}