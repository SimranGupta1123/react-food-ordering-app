import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // Older Redux(Dont mutate state)
      // const newState = [...state];
      // newState.items.push(action.payload)
      // return newState

      // In Redux toolkit we have to mutate the state.
      // Mutating the state here
      // Uses Immer Library
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.pop();
    },
    clearCart: (state) => {
      // Either mutate a state or return the new state
      // state.items.length = 0; //[]
      return { items: [] };
    },
  },
});
//export actions and reducer

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
