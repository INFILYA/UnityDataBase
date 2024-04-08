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

// import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
// import { TUserInfo } from "../../types/Types";
// import { RootState } from "../store";
// import { onValue } from "firebase/database";
// import { playersRef } from "../../config/firebase";

// export const fetchUsersList = createAsyncThunk("players", async () => {
//   onValue(playersRef(""), (snapshot) => {
//     const data = snapshot.val();
//     if (data !== null) {
//       // return data;
//       return Object.values(data);
//     }
//   });
// });

// type TPlayers = {
//   players: TUserInfo[];
//   filters: { userInfo: string; userToCompare: string };
//   loading: boolean;
//   failed: boolean;
// };
// const initialState: TPlayers = {
//   players: [],
//   filters: { userInfo: "", userToCompare: "" },
//   loading: true,
//   failed: false,
// };

// export const playersSlice = createSlice({
//   name: "players",
//   initialState,
//   // reducers: {
//   //   setPlayers: (state, action: PayloadAction<TUserInfo[]>) => {
//   //     state.players = action.payload;
//   //   },
//   // },
//   reducers: {
//     setUserInfo: (state, action: PayloadAction<string>) => {
//       state.filters.userInfo = action.payload;
//     },
//     setUserToCompare: (state, action: PayloadAction<string>) => {
//       state.filters.userToCompare = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsersList.fulfilled, (state, action) => {
//         state.players = action.payload;
//         state.loading = false;
//         state.failed = false;
//       })
//       .addCase(fetchUsersList.pending, (state) => {
//         state.loading = true;
//         state.failed = false;
//       })
//       .addCase(fetchUsersList.rejected, (state) => {
//         state.loading = false;
//         state.failed = true;
//         state.players = [];
//       });
//   },
// });
// export const { setUserInfo, setUserToCompare } = playersSlice.actions;
// export default playersSlice.reducer;
// export const selectPlayers = (state: RootState) => state.players.players;
// export const selectorFilter = (state: RootState) => state.players.filters;

// export const selectFilteredUsers = createSelector(
//   selectPlayers,
//   selectorFilter,
//   (players, filters) =>
//     players
//       .filter((player) => (filters.userInfo === "" ? "" : player.email === filters.userInfo))
//       .filter((player) =>
//         filters.userToCompare === "" ? "" : player.email === filters.userToCompare
//       )
// );
