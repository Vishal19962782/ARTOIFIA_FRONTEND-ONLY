import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserDetails: (state, {payload}) => {
        
      state.user = payload;
    },
  },
});
export const getUser = (state) => state.users.user;
export const { addUserDetails } = userSlice.actions;
export default userSlice.reducer;
