import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { mail: null };
const initialdataState = {
  recipientEmail: null,
  senderMail: null,
  subject: null,
  content: null,
};

const mailDataSlice = createSlice({
  name: "data",
  initialState: initialdataState,
  reducers: {
    setdata(state, action) {
      state.recipientEmail = action.payload;
      state.senderMail = action.payload;
      state.subject = action.payload;
      state.content = action.payload;
    },
  },
});

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
  reducer: {
    mail: mailSlice.reducer,
    data: mailDataSlice.reducer,
  },
});

export const mailAction = mailSlice.actions;
export const dataAction = mailDataSlice.actions;
export default Store;
