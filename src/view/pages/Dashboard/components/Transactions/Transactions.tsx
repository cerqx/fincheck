import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { useTransactionsController } from "./useTransactionsController";

import 'swiper/css';
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { cn } from "../../../../../app/utils/cn";

export function Transactions() {
    const { slideState, setSlideState, areValuesVisible } = useTransactionsController();

    return (
        <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 flex flex-col md:p-10">
            <header>
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

            <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex-1 flex items-center gap-3">
                        <CategoryIcon type="expense"/>

                        <div>
                            <strong className="text-gray-800 font-bold tracking-[-0.5px]">
                                Almoço
                            </strong>

                            <span className="text-sm text-gray-600 block ">
                                14/01/2024
                            </span>
                        </div>
                    </div>

                    <span 
                        className={cn(
                            'text-red-800 font-medium tracking-[-0.5px]',
                            !areValuesVisible && 'blur-sm'
                        )}
                    >
                        - {formatCurrency(120)}
                    </span>
                </div>

                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex-1 flex items-center gap-3">
                        <CategoryIcon type="income"/>

                        <div>
                            <strong className="text-gray-800 font-bold tracking-[-0.5px]">
                                Freelance
                            </strong>

                            <span className="text-sm text-gray-600 block ">
                                15/01/2024
                            </span>
                        </div>
                    </div>

                    <span 
                        className={cn(
                            'text-green-800 font-medium tracking-[-0.5px]',
                            !areValuesVisible && 'blur-sm'
                        )}
                    >
                        {formatCurrency(2120 )}
                    </span>
                </div>
            </div>
        </div>
    )
}