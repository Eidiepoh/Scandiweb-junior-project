import { configureStore } from "@reduxjs/toolkit";
import currencySlice from './slices/currencySlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        currency: currencySlice,
        cart: cartSlice
    }
})

export default store;
