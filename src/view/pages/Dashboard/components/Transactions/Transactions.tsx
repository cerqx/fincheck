import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { useTransactionsController } from "./useTransactionsController";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";

import emptyStateImage from "../../../../../assets/empty-state.svg";

import 'swiper/css';
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FiltersModal } from "./FiltersModal";
import { formatDate } from "../../../../../app/utils/formatDate";

export function Transactions() {
    const {
        slideState,
        setSlideState,
        areValuesVisible,
        transactions,
        isInitialLoading,
        isLoading,
        isFiltersModalOpen,
        handleOpenFiltersModal,
        handleCloseFiltersModal
    } = useTransactionsController();

    const hasTransactions = transactions.length > 0;

    return (
        <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 flex flex-col md:p-10">
            {isInitialLoading && (
                <div className="w-full h-full flex items-center justify-center">
                    <Spinner className="w-10 h-10" />
                </div>
            )}

           {!isInitialLoading && (
            <>
                <FiltersModal open={isFiltersModalOpen} onClose={handleCloseFiltersModal} />

                <header>
                    <div className="flex items-center justify-between">
                        <TransactionTypeDropdown />

                        <button onClick={handleOpenFiltersModal}>
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
                    {(!hasTransactions || isLoading) && (
                        <div className="flex flex-col items-center justify-center h-full">
                            {isLoading && (
                                <Spinner />
                            )}

                            {!isLoading && (
                                <>
                                    <img src={emptyStateImage} alt="Empty State" />
                                    <p className="text-gray-700">Não encontramos nenhuma transação!</p>
                                </>
                            )}
                        </div>
                    )}

                    {hasTransactions && !isLoading && (
                        transactions.map(transaction => (
                            <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4" key={transaction.id}>
                                <div className="flex-1 flex items-center gap-3">
                                    <CategoryIcon 
                                        type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
                                        category={transaction.category?.icon}
                                    />

                                    <div>
                                        <strong className="text-gray-800 font-bold tracking-[-0.5px]">
                                            {transaction.name}
                                        </strong>

                                        <span className="text-sm text-gray-600 block ">
                                            {formatDate(new Date(transaction.date))}
                                        </span>
                                    </div>
                                </div>

                                <span 
                                    className={cn(
                                        'font-medium tracking-[-0.5px]',
                                        transaction.type === 'EXPENSE' ? 'text-red-800' : 'text-green-800',
                                        !areValuesVisible && 'blur-sm'
                                    )}
                                >
                                    {transaction.type === 'EXPENSE' ? '-' : '+'}
                                    {formatCurrency(transaction.value)}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </>
           )}
        </div>
    )
}