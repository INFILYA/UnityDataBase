import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUserInfo } from "../../types/Types";
import { RootState } from "../store";
import { emptyUser } from "../../utilities/functions";

type TUserInformation = {
  userInfo: TUserInfo;
};

const initialState: TUserInformation = {
  userInfo: emptyUser,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<TUserInfo>) => {
      state.userInfo = action.payload;
    },
  },
});
export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
export const selectUserInfo = (state: RootState) => state.userInfo.userInfo;
