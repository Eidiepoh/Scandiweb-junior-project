import  { createSlice } from '@reduxjs/toolkit';

const cartData = JSON.parse(localStorage.getItem('cart')) || []

const startingQuantity = () => {
  let quantity = cartData.reduce((accumulator, item) => accumulator + item.quantity, 0)
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

      setAttributeChanges: (state, action) => {
        const { changedProperty, preChangedCartProduct } = action.payload;
        const selectedAttrIndex = preChangedCartProduct.attributes.findIndex(product => product.id === changedProperty.id);

        if (preChangedCartProduct.attributes[selectedAttrIndex].selected === changedProperty.selected) {
          return;
        }
        state.cartData.forEach((item, index) => {
          // loop cartData and find pre-changed data location
          if(item.id === preChangedCartProduct.id && 
            JSON.stringify(item.attributes) === JSON.stringify(preChangedCartProduct.attributes)) {
              // creating copy object, representing how changed data should be
              const temp = JSON.parse(JSON.stringify(state.cartData[index]));
              temp.attributes[selectedAttrIndex] = changedProperty;

              // finding if copy of temp object already exists
              const tempCopyIndex = state.cartData.findIndex((item) => item.id === temp.id && 
                JSON.stringify(item.attributes) === JSON.stringify(temp.attributes))

              // if this kind of object doesn't exist, upgrade it by replacing it with temp
              if(tempCopyIndex === -1) {
                state.cartData[index] = temp;
              } else {
                // if this kind of object already exists, increase its quantity
                state.cartData[tempCopyIndex].quantity += state.cartData[index].quantity;
                state.cartData[index].quantity = 0;
                state.cartData.splice(index,1)
              }
            }
        });
        // clear cartData from products with 0 quantity
        state.cartData = state.cartData.filter(item => item.quantity > 0);
        localStorage.setItem('cart',JSON.stringify(state.cartData));
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

export const { setCart, setAttributeChanges, setQuantityChanges, setTotalQuantityAndTotal }  = cartSlice.actions;

export default cartSlice.reducer;
