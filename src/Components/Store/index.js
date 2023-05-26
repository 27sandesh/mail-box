import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { mail: null };
const mailSlice = createSlice({
  name: "Mail",
  initialState: initialState,
  reducers: {
    setemail(state, action) {
      state.mail = action.payload;
    },
  },
});
const Store = configureStore({
  mail: mailSlice.reducer,
});
export const mailAction = mailSlice.actions;
export default Store;
