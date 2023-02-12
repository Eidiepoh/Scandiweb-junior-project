import  { createSlice } from '@reduxjs/toolkit';

const cartData = JSON.parse(localStorage.getItem('cart')) || []

const startingQuantity = () => {
  let quantity = 0;
  cartData.map(item => {
      quantity += item.quantity;
  })
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
      state.quantity += 1
      localStorage.setItem('cart',JSON.stringify(state.cartData));
      },

      setAttributeChanges: (state, action) => {
        const { changedProperty, preChangedCartProduct } = action.payload
        let selectedAttr;
        let selectedAttrIndex;
        preChangedCartProduct.attributes.map((product, index) => {
          if(product.id === changedProperty.id) {
            selectedAttr = product;
            selectedAttrIndex = index;
            return;
          }
        })
        if(selectedAttr.selected === changedProperty.selected) return
        
        
        state.cartData.map((item, index) => {

          // loop cartData and find pre-changed data location
          if(item.id === preChangedCartProduct.id && 
            JSON.stringify(item.attributes) === JSON.stringify(preChangedCartProduct.attributes)) {
              // creating copy object, representing how changed data should be
              let temp = JSON.parse(JSON.stringify(state.cartData[index]));
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
        localStorage.setItem('cart',JSON.stringify(state.cartData));
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
      },
      
      setTotalQuantityAndTotal: (state, action) => {
        state.quantity = action.payload[0];
        state.total = action.payload[1];
      }
    }
  })

export const { setCart, setAttributeChanges, setQuantityChanges, setTotalQuantityAndTotal }  = cartSlice.actions;

export default cartSlice.reducer;
