import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUserInfo } from "../../types/Types";
import { RootState } from "../store";

type TPlayers = {
  players: TUserInfo[];
};
const initialState: TPlayers = {
  players: [],
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<TUserInfo[]>) => {
      state.players = action.payload;
    },
  },
});
export const { setPlayers } = playersSlice.actions;
export default playersSlice.reducer;
export const selectPlayers = (state: RootState) => state.players.players;
