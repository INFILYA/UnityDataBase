import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUserInfo } from "../../types/Types";
import { RootState } from "../store";
import { emptyUser } from "../../utilities/functions";

type TUserInformation = {
  userToCompare: TUserInfo;
};

const initialState: TUserInformation = {
  userToCompare: emptyUser,
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
