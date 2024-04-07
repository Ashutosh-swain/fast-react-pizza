import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = newItem (basically a new object)
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // finding the that pizza item using id and then increasing the quantity
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // finding the that pizza item using id and then increasing the quantity
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      // Action creator function inside Action creator function or u can just copypaste the logic of that action creator function
      // reusing the action creator function inside an action creator function
      if (item.quantity === 0) {
        // new method or trick of calling a action creator function inside an action creator function
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearcart(state) {
      state.cart = [];
    },
  },
});

// exporting the action creator functions
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearcart,
} = cartSlice.actions;
// exporting the reucer function
export default cartSlice.reducer;

//redux selector functions :
// this is a redux selector function and its name should always start from get keyword
// these selector function can cause performance problems so instead see and use reselect library of redux (read by your own)
// reselect library of redux
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
