import { CategoryIcon } from "../../../components/icons/categories/CategoryIcon";

export function AccountCard() {
    return (
        <div 
            className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
            style={{borderColor: '#7950F2'}}
        >
            <div>
                <CategoryIcon type="income" />

                <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">Nubank</span>
            </div>
            
            <div>
                <span className="text-gray-800 font-medium tracking-[-0.5px] block">R$123.00</span>
                <small className="text-gray-600 text-sm">Saldo atual</small>
            </div>
        </div>
    )
}