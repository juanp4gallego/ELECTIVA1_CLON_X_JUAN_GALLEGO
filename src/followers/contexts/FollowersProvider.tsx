import { useContext, useEffect, useReducer, type ReactNode } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { FireBaseDB } from "../../firebase/config";
import { AuthContext } from "../../auth/contexts/AuthContext";
import type { User } from "../../auth/types/AuthReducerInterfaces";
import { saveUserProfile, followUser as saveFollow, unfollowUser as removeFollow } from "../../social/providers/providers";
import { FollowersContext } from "./FollowersContext";
import { FollowersReducer } from "../reducers/FollowersReducer";
import { ACCION_TYPES } from "../reducers/actionTypes";
import type { FollowersState } from "../types/FollowerInterfaces";

const initialState: FollowersState = {
    users: [], loading: true, errorMessage: null, recommendations: [], following: [],
};

export const FollowersProvider = ({ children }: { children: ReactNode }) => {
    const { authState } = useContext(AuthContext);
    const [followersState, dispatch] = useReducer(FollowersReducer, initialState);
    const currentUser = authState.user;

    useEffect(() => {
        if (!currentUser) return;
        let active = true;
        let profiles: User[] = [];
        let followerIds: string[] = [];
        let followedIds: string[] = [];
        let profilesLoaded = false, followersLoaded = false, followingLoaded = false;
        let loadError: string | null = null;

        const updateLists = () => {
            if (!active) return;
            const others = profiles.filter(user => user.uid !== currentUser.uid);
            const sorted = [...others].sort((a, b) => a.username.localeCompare(b.username, "es"));
            dispatch({ type: ACCION_TYPES.load, payload: {
                users: sorted.filter(user => followerIds.includes(user.uid)).map(user => ({ ...user, isFollowing: followedIds.includes(user.uid) })),
                following: sorted.filter(user => followedIds.includes(user.uid)),
                recommendations: sorted.filter(user => !followedIds.includes(user.uid)),
                loading: !loadError && !(profilesLoaded && followersLoaded && followingLoaded),
                errorMessage: loadError,
            } });
        };
        const onError = (error: unknown) => {
            if (!active) return;
            loadError = error instanceof FirebaseError && error.code === "permission-denied"
                ? "No hay permisos para consultar usuarios y relaciones. Revisa las reglas de users y follows."
                : "No se pudieron cargar los usuarios. Revisa tu conexión.";
            dispatch({ type: ACCION_TYPES.error, payload: { loading: false, errorMessage: loadError } });
        };
        void saveUserProfile(currentUser).catch(onError);
        const stopUsers = onSnapshot(collection(FireBaseDB, "users"), snapshot => {
            profiles = snapshot.docs.map(document => {
                const data = document.data();
                return { uid: document.id, username: data.username || data.fullName || "Usuario", email: data.email || "", photoURL: data.photoURL || "" };
            });
            profilesLoaded = true; updateLists();
        }, onError);
        const stopFollowers = onSnapshot(query(collection(FireBaseDB, "follows"), where("followedId", "==", currentUser.uid)), snapshot => {
            followerIds = snapshot.docs.map(document => document.data().followerId);
            followersLoaded = true; updateLists();
        }, onError);
        const stopFollowing = onSnapshot(query(collection(FireBaseDB, "follows"), where("followerId", "==", currentUser.uid)), snapshot => {
            followedIds = snapshot.docs.map(document => document.data().followedId);
            followingLoaded = true; updateLists();
        }, onError);
        return () => { active = false; stopUsers(); stopFollowers(); stopFollowing(); };
    }, [currentUser]);

    const followUser = async (uid: string): Promise<boolean> => {
        const user = [...followersState.users, ...followersState.recommendations].find(user => user.uid === uid);
        if (!user) return false;
        try {
            await saveFollow({ uid: user.uid, username: user.username, email: user.email || "", photoURL: user.photoURL || "" });
            return true;
        } catch {
            dispatch({ type: ACCION_TYPES.error, payload: { errorMessage: "No se pudo seguir al usuario. Revisa tu conexión y los permisos de follows." } });
            return false;
        }
    };

    const unfollowUser = async (uid: string): Promise<boolean> => {
        try {
            await removeFollow(uid);
            // El listener de Firestore actualiza las listas mediante el reducer.
            return true;
        } catch {
            dispatch({ type: ACCION_TYPES.error, payload: {
                errorMessage: "No se pudo dejar de seguir al usuario. Revisa tu conexión y el permiso de eliminar en follows.",
            } });
            return false;
        }
    };

    return <FollowersContext.Provider value={{ followersState, followUser, unfollowUser }}>{children}</FollowersContext.Provider>;
};



