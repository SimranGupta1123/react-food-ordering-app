const { configureStore } = require("@reduxjs/toolkit");
import cartReducer from "./cartSlice";

const appStore = configureStore({
  // Multiple slices
  reducer: {
    cart: cartReducer,
  },
});

export default appStore;
