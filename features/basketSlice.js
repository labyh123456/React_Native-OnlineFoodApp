import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
  },
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (:id ${action.payload.id}) as its not in basket! `
        );
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export const selectBasketItem = (state) => state.basket.items;
export const selectBasketItemWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);
export default basketSlice.reducer;
