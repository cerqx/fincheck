import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

interface SliderNavigationProps {
    isBeginning: boolean;
    isEnd: boolean;
}

export function SliderNavigation({ isBeginning, isEnd }: SliderNavigationProps) {
    const swiper = useSwiper();
     
    return (
        <>
            <button 
                className="bg-gradient-to-r from-gray-100 to-transparent w-12 h-12 absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-10 disabled:opacity-40 disabled:cursor-not-allowed" 
                onClick={() => swiper.slidePrev()}
                disabled={isBeginning}
            >
                <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
            </button>

            <button 
                className="bg-gradient-to-l from-gray-100 to-transparent w-12 h-12 absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-10 disabled:opacity-40 disabled:cursor-not-allowed" 
                onClick={() => swiper.slideNext()}
                disabled={isEnd}
            >
                <ChevronRightIcon className="w-6 h-6 text-gray-800" />
            </button>
        </>
    )
}