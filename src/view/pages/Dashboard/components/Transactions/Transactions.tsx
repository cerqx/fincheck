import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { useTransactionsController } from "./useTransactionsController";

import 'swiper/css';

export function Transactions() {
    const { slideState, setSlideState } = useTransactionsController();

    return (
        <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10">
            <header className="">
                 <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2">
                        <TransactionsIcon />
                        <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
                            Transações
                        </span>
                        <ChevronDownIcon className="text-gray-900"/>
                    </button>

                    <button>
                        <FilterIcon />
                    </button>
                 </div>

                 <div className="mt-6 relative">
                    <Swiper
                        slidesPerView={3}
                        centeredSlides
                        onSlideChange={(swiper) => {
                            setSlideState({
                                isBeginning: swiper.isBeginning,
                                isEnd: swiper.isEnd
                            })
                        }}
                    >
                        <SliderNavigation isBeginning={slideState.isBeginning} isEnd={slideState.isEnd} />

                        {MONTHS.map((month, index) => (
                            <SwiperSlide key={month}>
                                {({ isActive }) => (
                                    <SliderOption isActive={isActive} month={month} index={index}/>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                 </div>
            </header>

            <div className="mt-4">
                Conteúdo
            </div>
        </div>
    )
}