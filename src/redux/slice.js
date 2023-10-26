import { createSlice } from "@reduxjs/toolkit";
import { logOut, signIn, signUp, updateProfile } from "./operations";

const handleRejected = (state, action) => {
    state.error = action.payload;
}

const initialState = {
    id: '',
    login: '',
    email: '',
    avatar: '',
    error: null,
    auth: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setProfile(state, action) {
            const { uid, displayName, email, photoURL } = action.payload;
            state.id = uid;
            state.login = displayName;
            state.email = email;
            state.avatar = photoURL;
            state.auth = true;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(signUp.fulfilled, (state, action) => {
                authSlice.caseReducers.setProfile(state, action);
            })
            .addCase(signUp.rejected, handleRejected)
            .addCase(signIn.fulfilled, (state, action) => {
                authSlice.caseReducers.setProfile(state, action);
            })
            .addCase(signIn.rejected, handleRejected)
            .addCase(logOut.fulfilled, (state) => {
                Object.assign(state, initialState)
            })
            .addCase(logOut.rejected, handleRejected)
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.avatar = action.payload;
            })
    }
})

export const { setProfile } = authSlice.actions;
export const authReducer = authSlice.reducer;