import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { mail: null };
const initialdataState = {
  recipientEmail: null,
  senderMail: null,
  subject: null,
  content: null,
  mailData: [],
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

const Store = configureStore({
  reducer: {
    mail: mailSlice.reducer,
    data: mailDataSlice.reducer,
  },
});

export const mailAction = mailSlice.actions;
export const dataAction = mailDataSlice.actions;
export default Store;
