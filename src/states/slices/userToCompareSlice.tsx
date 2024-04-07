import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUserInfo } from "../../types/Types";
import { RootState } from "../store";

type TUserInformation = {
  userToCompare: TUserInfo;
};

const initialState: TUserInformation = {
  userToCompare: {
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

export const userToCompareSlice = createSlice({
  name: "userToCompare",
  initialState,
  reducers: {
    setUserToCompare: (state, action: PayloadAction<TUserInfo>) => {
      state.userToCompare = action.payload;
    },
  },
});
export const { setUserToCompare } = userToCompareSlice.actions;
export default userToCompareSlice.reducer;
export const selectuserToCompare = (state: RootState) => state.userToCompare.userToCompare;
