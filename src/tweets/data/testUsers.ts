import type { User } from "../../auth/types/AuthReducerInterfaces";
import { followedUsers } from "../../following/data/followedUsers";
import { followers } from "../../followers/data/followers";

// Completa los campos del usuario para los datos de prueba.
export const getTestUser = (uid: string): User => {
    const user = followedUsers.find(user => user.uid === uid) || followers.find(user => user.uid === uid);
    return { uid, username: user?.username ?? "Usuario de prueba", email: "", photoURL: "" };
};
