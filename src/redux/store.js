import { configureStore } from "@reduxjs/toolkit";
import addToCartReducer from "../features/cartActions";

export const store = configureStore({
  reducer: { cart: addToCartReducer },
});
