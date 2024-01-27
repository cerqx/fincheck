import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide  } from 'swiper/react';

import 'swiper/css';
import { useAccountsController } from "./useAccountsController";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";

export function Accounts() {
    const {
        sliderState,
        setSliderState,
        windowWidth,
        areValuesVisible,
        toggleValuesVisibility 
    } = useAccountsController();


    return (
        <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
            <div>
                <span className="tracking-[0.5px] text-white block">Saldo total</span>
               
               <div className="flex items-center gap-2">
                    <strong 
                        className={cn(
                            'text-2xl tracking-[-1px] text-white',
                            !areValuesVisible && 'blur-md'
                        )}
                    >
                        {formatCurrency(1000)}
                    </strong>
                    <button 
                        className="h-8 w-8 flex items-center justify-center"
                        onClick={toggleValuesVisibility}
                    >
                        <EyeIcon open={areValuesVisible} />
                    </button>
               </div>
            </div>

            <div className="flex-1 flex flex-col justify-end  mt-10 md:mt-0">
                <div>
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={windowWidth >= 500 ? 2.1 : 1.2}
                        onSlideChange={swiper => {
                            setSliderState({
                                isBeginning: swiper.isBeginning,
                                isEnd: swiper.isEnd
                            })
                        }}
                    >
                        <div className="flex items-center justify-between mb-4" slot="container-start">
                            <strong className="text-white tracking-[-1px] text-lg font-bold">Minhas contas</strong>

                            <SliderNavigation 
                                isBeginning={sliderState.isBeginning} 
                                isEnd={sliderState.isEnd} 
                            /> 
                            
                        </div>

                        <SwiperSlide>
                            <AccountCard 
                                color="#7950F2"
                                name="Nubank"
                                balance={1000.23}
                                type="CASH"
                            />
                        </SwiperSlide>

                        <SwiperSlide>
                            <AccountCard 
                                color="#F00"
                                name="Inter"
                                balance={2000.00}
                                type="INVESTMENT"
                            />
                        </SwiperSlide>

                        <SwiperSlide>
                            <AccountCard 
                                color="#0F0"
                                name="Carteira"
                                balance={30000.00}
                                type="CHECKING"
                            />
                        </SwiperSlide>                                                                        
                    </Swiper>
                </div>
            </div>
        </div>
    )
}