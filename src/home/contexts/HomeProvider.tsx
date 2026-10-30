import { useContext, useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { HomeContext } from "./HomeContext";
import { getHomeStats } from "../providers/providers";
import type { HomeContextValue } from "../types/HomeInterfaces";


export const HomeProvider = ({ children }: { children: ReactNode }) => {
    const { authState } = useContext(AuthContext);
    const [state, setState] = useState<HomeContextValue>({
        stats: null, loading: true, errorMessage: null,
    });
    const userId = authState.user?.uid ?? "";

    useEffect(() => {
        let active = true;
        const loadStats = async () => {
            try {
                const result = await getHomeStats(userId);
                if (!active) return;
                if (result.ok === true) {
                    setState({ stats: result.stats, loading: false, errorMessage: null });
                } else {
                    setState({ stats: null, loading: false, errorMessage: result.errorMessage });
                }
            } catch {
                if (active) setState({ stats: null, loading: false, errorMessage: "No se pudieron cargar los contadores." });
            }
        };
        loadStats();
        return () => { active = false; };
    }, [userId]);

    return <HomeContext.Provider value={state}>{children}</HomeContext.Provider>;
};
