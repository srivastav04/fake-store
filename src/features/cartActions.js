import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "cart",
  initialState: {
    Items: [],
    cartItems: [],
    showCart: false,
  },
  reducers: {
    ITEMS: (state, action) => {
      state.Items = action.payload;
    },
    ADD_ITEM: (state, action) => {
      let inCart = false;
      state.cartItems.forEach((element) => {
        if (element.id === action.payload.id) {
          element.quantity = element.quantity + 1;
          inCart = true;
        }
      });
      if (!inCart) {
        state.cartItems.push(action.payload);
      }
    },
    ADJUST_ITEM: (state, action) => {
      state.cartItems.forEach((element) => {
        if (element.title === action.payload.title) {
          element.quantity = element.quantity + action.payload.quantity;
        }
      });
    },
    REMOVE_ITEM: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter((el) => el.id !== action.payload),
      };
    },
  },
});
export const { ADD_ITEM, ADJUST_ITEM, REMOVE_ITEM, ITEMS } =
  counterSlice.actions;

export default counterSlice.reducer;
