export function currencyStringToNumber(value: string | number) {
    // const sanitizedString = value.replace(/\./g, '').replace(',', '.');

    if(typeof value === 'number') {
        return value;
    }
    
    const sanitizedString = value.replace(/,/g, '');

    return Number(sanitizedString);
}