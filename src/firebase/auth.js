import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './config';

export const registerDB = async (email, password, login, avatar) => {
    try {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        if (data) {
            await updateProfile(auth.currentUser, {
                displayName: login,
                photoURL: avatar
            })
        }
        return data.user;
    } catch (error) {
        return;
    }    
}

export const loginDB = async (email, password) => {
    try {
        const data = await signInWithEmailAndPassword(auth, email, password)
        console.log(data.user);
        return data.user
    } catch (error) {
        console.log(error);
        return;
    }
};


export const logoutDB = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        return error;
    }
};


export const updateUserProfile = async (photo) => {
    try {
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
                photoURL: photo
            })
        }
        return photo;
    } catch (error) {
        return error;
    }
};