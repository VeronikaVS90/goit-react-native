import { collection, addDoc, query, where, orderBy, onSnapshot, doc, updateDoc, increment, FieldValue, arrayUnion } from "firebase/firestore";
import { db } from "./config";

export const postsRef = collection(db, 'posts');

export const addPost = async (post) => {
    try {
        const docRef = await addDoc(postsRef, post);
        return docRef;
    } catch (error) {
        return error;
    }
};

export const getUserPosts = async (userId) => {
    try {
        const querySnapshot = query(postsRef, where("userId", "==", userId));
        const posts = [];
        onSnapshot(querySnapshot, data => {
            data.docs.map(doc =>
                posts.push({
                    id: doc.id,
                    ...doc.data(),
                }));
        });
        return posts;
    } catch (error) {
        return;
    }
};


export const addLike = async (postId, userId) => {
    try {
        const post = doc(db, "posts", `${postId}`);
        await updateDoc(post, {
            likes: {
                people: arrayUnion(userId),
                amount: increment(1)}
        })
        console.log("document updated");
    } catch (error) {
        return;
    }
};

export const addComment = async (postId, comment) => {
    try {
        const commentsRef = collection(db, 'posts', `${postId}`, 'comments');
        const commentDoc = await addDoc(commentsRef, comment);
        return commentDoc;
    } catch (error) {
        console.log(error);
        return;
    }
};