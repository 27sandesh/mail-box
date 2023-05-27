import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { mail: null };
const initialdataState = {
  recipientEmail: null,
  senderMail: null,
  subject: null,
  content: null,
  mailData: [],
  newMsgCount: 0,
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
    deletedata(state, action) {
      const { mailId } = action.payload;
      if (state.mailData) {
        const updatedData = state.mailData.filter((mail) => mail.id !== mailId);
        state.mailData = updatedData;
      }
    },
    setMailData(state, action) {
      state.mailData = action.payload;
    },
    setnewMsgCount(state, action) {
      state.newMsgCount = action.payload;
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
    markAsRead(state, action) {
      const { mailId } = action.payload;
      if (state.mailData) {
        const updatedMailData = state.mailData.map((mail) => {
          if (mail.id === mailId) {
            return { ...mail, read: true };
          } else {
            return mail;
          }
        });
        state.mailData = updatedMailData;
      }
    },
  },
});
const initialAuthState = { isAuthciated: false, token: null };
const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthciated = true;
      state.token = action.payload;
    },
    logout(state) {
      state.isAuthciated = false;
    },
  },
});
const Store = configureStore({
  reducer: {
    mail: mailSlice.reducer,
    data: mailDataSlice.reducer,
    auth: AuthSlice.reducer,
  },
});
export const AuthAction = AuthSlice.actions;
export const mailAction = mailSlice.actions;
export const dataAction = mailDataSlice.actions;
export default Store;
