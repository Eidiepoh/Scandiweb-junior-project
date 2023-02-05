import { setTotalQuantityAndTotal } from '../redux/slices/cartSlice';

export const updateCartSliceQuantityAndTotal = (cartData, currency) => {
    let quantity = 0;
    let total = 0;
    cartData.map(item => {
        quantity += item.quantity;
        item.prices.filter(price => {
            if(price.currency.symbol === currency) {
                total += (price.amount * item.quantity)
            }
        })
    })
    return {
            quantity: quantity,
            total: total
        }
}