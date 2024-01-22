import { Spinner } from "./Spinner";

export function PageLoader() {
    return (
        <div className="w-full h-full flex items-center justify-center fixed bg-gray-50">
            <Spinner />
        </div>
    )
}