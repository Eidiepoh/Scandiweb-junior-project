import { createSlice } from '@reduxjs/toolkit';

const currentCurrency = localStorage.getItem('currency') || '$'

const initialState = {
    currency: currentCurrency
}

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
      setCurrency: (state, action) => {
        state.currency = action.payload;
        localStorage.setItem('currency', action.payload);
      }
    }
  })

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
