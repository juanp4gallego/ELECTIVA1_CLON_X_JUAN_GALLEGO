import { useEffect, useState, type ReactNode } from "react";
import { FollowingContext } from "./FollowingContext";
import { getFollowedUsers } from "../providers/providers";
import type { FollowingState } from "../types/FollowingInterfaces";

const initialState: FollowingState = {
    users: [],
    loading: true,
    errorMessage: null,
};

interface FollowingProviderProps {
    children: ReactNode;
}

export const FollowingProvider = ({ children }: FollowingProviderProps) => {
    const [followingState, setFollowingState] = useState(initialState);

    useEffect(() => {
        let active = true;
        const loadUsers = async () => {
            try {
                const result = await getFollowedUsers();
                if (!active) return;
                if (result.ok === true) {
                    setFollowingState({ users: result.users, loading: false, errorMessage: null });
                } else {
                    setFollowingState({ users: [], loading: false, errorMessage: result.errorMessage });
                }
            } catch {
                if (active) setFollowingState({
                    users: [], loading: false, errorMessage: "No se pudieron cargar los usuarios seguidos.",
                });
            }
        };
        void loadUsers();
        return () => { active = false; };
    }, []);

    return (
        <FollowingContext.Provider value={followingState}>
            {children}
        </FollowingContext.Provider>
    );
};
