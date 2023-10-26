import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginDB, logoutDB, registerDB, updateUserProfile } from "../firebase/auth";

export const signUp = createAsyncThunk('auth/signup',
    async (credetials, thunkAPI) => {
        try {
            const { email, passwd, login, avatar } = credetials;
            const user = await registerDB(email, passwd, login, avatar);
            const response = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    })


export const signIn = createAsyncThunk('auth/signin',
    async (credetials, thunkAPI) => {
        try {
            const { email, passwd } = credetials;
            const user = await loginDB(email, passwd);
            const response = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        
    })
export const logOut = createAsyncThunk('auth/logout',
    async (_, thunkAPI) => {
        try {
            await logoutDB();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    })

export const updateProfile = createAsyncThunk('auth/update',
    async (photo, thunkAPI) => {
        try {
            const photoURL = updateUserProfile(photo);
            return photoURL;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    })