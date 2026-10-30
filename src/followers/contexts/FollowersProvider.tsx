import { useEffect, useState, type ReactNode } from "react";
import { FollowersContext } from "./FollowersContext";
import { getFollowers, followUserById } from "../providers/providers";
import type { FollowersState } from "../types/FollowerInterfaces";

const initialState: FollowersState = { users: [], loading: true, errorMessage: null };

interface FollowersProviderProps {
    children: ReactNode;
}

export const FollowersProvider = ({ children }: FollowersProviderProps) => {
    const [followersState, setFollowersState] = useState(initialState);

    useEffect(() => {
        let active = true;
        const loadFollowers = async () => {
            try {
                const users = await getFollowers();
                if (active) setFollowersState({ users, loading: false, errorMessage: null });
            } catch {
                if (active) setFollowersState({
                    users: [], loading: false, errorMessage: "No se pudieron cargar los seguidores.",
                });
            }
        };
        void loadFollowers();
        return () => { active = false; };
    }, []);

    const followUser = async (uid: string): Promise<boolean> => {
        try {
            const result = await followUserById(uid);
            if (result.ok) {
                setFollowersState(current => ({
                    ...current,
                    users: current.users.map(user => user.uid === uid ? { ...user, isFollowing: true } : user),
                    errorMessage: null,
                }));
                return true;
            } else {
                setFollowersState(current => ({ ...current, errorMessage: result.errorMessage }));
                return false;
            }
        } catch {
            setFollowersState(current => ({ ...current, errorMessage: "No se pudo seguir al usuario." }));
            return false;
        }
    };

    return (
        <FollowersContext.Provider value={{ followersState, followUser }}>
            {children}
        </FollowersContext.Provider>
    );
};
