import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../config/firebase.config";

const initialState = {
  user: { email: "", role: "" },
  isLoading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    return data?.user?.email;
  }
);

export const getUser = createAsyncThunk("auth/getUser", async (email) => {
  const res = await fetch(`${process.env.REACT_APP_DEV_URL}user/${email}`);
  const data = await res.json();

  if (data.status) return data;

  return email;
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);

    return data?.user?.email;
  }
);

export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
  const provider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, provider);

  return data?.user?.user.email;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = { email: "", role: "" };
    },
    setUser: (state, { payload }) => {
      state.user.email = payload;
      state.isLoading = false;
    },
    toggleLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // sign up
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.user.email = payload;
      })
      .addCase(createUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = true;
        state.error = error.message;
      })