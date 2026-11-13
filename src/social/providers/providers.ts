import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { FirebaseAuth, FireBaseDB } from "../../firebase/config";
import type { User } from "../../auth/types/AuthReducerInterfaces";

export const saveUserProfile = async (user: User) => {
    await setDoc(doc(FireBaseDB, "users", user.uid), {
        uid: user.uid, username: user.username || user.email,
        email: user.email, photoURL: user.photoURL || "",
    }, { merge: true });
};

export const followUser = async (user: User) => {
    const currentUid = FirebaseAuth.currentUser?.uid;
    if (!currentUid) throw new Error("Debes iniciar sesión.");
    if (currentUid === user.uid) throw new Error("No puedes seguirte a ti mismo.");
    await setDoc(doc(FireBaseDB, "follows", currentUid + "_" + user.uid), {
        followerId: currentUid,
        followedId: user.uid,
        user,
    });
};

export const getFollowCounts = async (uid: string) => {
    const followers = await getDocs(query(collection(FireBaseDB, "follows"), where("followedId", "==", uid)));
    const following = await getDocs(query(collection(FireBaseDB, "follows"), where("followerId", "==", uid)));
    return { followers: followers.size, following: following.size };
};

export const unfollowUser = async (uid: string) => {
    const currentUid = FirebaseAuth.currentUser?.uid;
    if (!currentUid) throw new Error("Debes iniciar sesión.");
    await deleteDoc(doc(FireBaseDB, "follows", currentUid + "_" + uid));
};
