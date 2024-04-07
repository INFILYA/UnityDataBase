import playersReducer from "./slices/playersSlice";
import userInfoReducer from "./slices/userInfoSlice";
import userToCompareReducer from "./slices/userToCompareSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    players: playersReducer,
    userInfo: userInfoReducer,
    userToCompare: userToCompareReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
