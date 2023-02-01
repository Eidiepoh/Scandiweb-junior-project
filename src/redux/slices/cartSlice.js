import  { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartData : []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      setCart:  (state, action) => {
        let isDuplicated;
        let temp;
      const duplicateCheck = state.cartData.filter(item => item.id === action.payload.id)
      if(duplicateCheck.length >= 1 ) {
        for(let attr of duplicateCheck) {
          temp =  JSON.stringify(attr.attributes) === JSON.stringify(action.payload.attributes);
          if(temp === true) isDuplicated = temp;

        }
        if(isDuplicated) {
          state.cartData.filter((item, index) => {
            if(JSON.stringify(item.attributes) === JSON.stringify(action.payload.attributes)) {
              state.cartData[index].quantity += 1
            }
          })
        } else {
          state.cartData.push(action.payload);
        }
      } else {
        state.cartData.push(action.payload);
      }
      }
    }
  })

export const { setCart }  = cartSlice.actions;

export default cartSlice.reducer;
