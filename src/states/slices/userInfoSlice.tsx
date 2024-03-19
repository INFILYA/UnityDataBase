import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUserInfo } from "../../types/Types";
import { RootState } from "../store";

type TUserInformation = {
  userInfo: TUserInfo;
};

const initialState: TUserInformation = {
  userInfo: {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    team: "",
    position: "",
    hand: "",
    telephone: "",
    birthday: "",
    height: "",
    weight: "",
    number: "",
    reach: "",
    photo: "",
    highlights: false,
  },
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
