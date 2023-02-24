export const updateCartSliceQuantityAndTotal = (cartData, currency) => {
    const { quantity, total } = cartData.reduce((accumulator, item) => {
        accumulator.quantity += item.quantity;
        const price = item.prices.find(p => p.currency.symbol === currency);
        if (price) {
            accumulator.total += price.amount * item.quantity;
        }
        return accumulator;
    }, { quantity: 0, total: 0 });
    return { quantity, total };
}