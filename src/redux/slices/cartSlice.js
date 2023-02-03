import  { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartData : JSON.parse(localStorage.getItem('cart')) || []
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
      localStorage.setItem('cart',JSON.stringify(state.cartData));
      },
      setAttributeChanges: (state, action) => {
        const { changedProperty, preChangedCartProduct } = action.payload

        state.cartData.map((item, index) => {
          if(item.id === preChangedCartProduct.id && 
            JSON.stringify(item.attributes) === JSON.stringify(preChangedCartProduct.attributes)) {
              let keyName = Object.keys(changedProperty)[0];
              state.cartData[index].attributes[keyName] = changedProperty[keyName]
              localStorage.setItem('cart',JSON.stringify(state.cartData));
            }
        });
      },
      setQuantityChanges: (state, action) => {
        state.cartData.map((item, index) => {
          if(item.id === action.payload[0].id &&
            JSON.stringify(item.attributes) === JSON.stringify(action.payload[0].attributes )) {
              if(state.cartData[index].quantity > 0) {
                state.cartData[index].quantity = action.payload[1];
              } 
              if(state.cartData[index].quantity <= 0) {
                state.cartData.splice(index,1)
              }
            }
        });
        localStorage.setItem('cart',JSON.stringify(state.cartData));
      }
    }
  })

export const { setCart, setAttributeChanges, setQuantityChanges }  = cartSlice.actions;

export default cartSlice.reducer;
