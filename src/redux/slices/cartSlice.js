import  { createSlice } from '@reduxjs/toolkit';

const cartData = JSON.parse(localStorage.getItem('cart')) || []

const startingQuantity = () => {
  const quantity = cartData.reduce((accumulator, item) => accumulator + item.quantity, 0)
  return quantity;
}


const initialState = {
    cartData : cartData,
    quantity : startingQuantity() ,
    total : 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      setCart: (state, action) => {
        const itemToAdd = action.payload;
        const existingItemIndex = state.cartData.findIndex(
          item => item.id === itemToAdd.id && JSON.stringify(item.attributes) === JSON.stringify(itemToAdd.attributes)
        );
      
        if (existingItemIndex !== -1) {
          state.cartData[existingItemIndex].quantity++;
        } else {
          state.cartData.push({ ...itemToAdd, quantity: 1 });
        }
      
        state.quantity++;
        localStorage.setItem('cart', JSON.stringify(state.cartData));
      },

      setQuantityChanges: (state, action) => {

        const [product, quantity] = action.payload;
        const { id, attributes } = product;

        const itemIndex = state.cartData.findIndex(
          item => item.id === id && JSON.stringify(item.attributes) === JSON.stringify(attributes)
        );
        if (itemIndex !== -1) {
          if (quantity > 0) {
            state.cartData[itemIndex].quantity = quantity;
          } else {
            state.cartData.splice(itemIndex, 1);
          }
          localStorage.setItem('cart', JSON.stringify(state.cartData));
        }
      },
      
      setTotalQuantityAndTotal: (state, action) => {
        state.quantity = action.payload[0];
        state.total = action.payload[1];

      }
    }
  })

export const { setCart, setQuantityChanges, setTotalQuantityAndTotal }  = cartSlice.actions;

export default cartSlice.reducer;
