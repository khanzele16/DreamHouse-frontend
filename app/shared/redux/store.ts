import auth from "./slices/auth";
import cards from "./slices/cards";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth,
    cards,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;