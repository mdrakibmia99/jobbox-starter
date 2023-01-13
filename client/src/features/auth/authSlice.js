import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../config/firebase.config";



export const { logout, setUser, toggleLoading } = authSlice.actions;

export default authSlice.reducer;
