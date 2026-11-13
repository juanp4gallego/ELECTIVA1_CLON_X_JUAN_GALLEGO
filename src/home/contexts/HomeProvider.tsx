import { HomeReducer } from "../reducers/HomeReducer";
import { ACCION_TYPES } from "../reducers/actionTypes";
import { useContext, useEffect, useReducer, type ReactNode } from "react";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { HomeContext } from "./HomeContext";
import { getHomeStats } from "../providers/providers";
import type { HomeContextValue } from "../types/HomeInterfaces";


const initialState: HomeContextValue = {
        stats: null, loading: true, errorMessage: null,
    };

export const HomeProvider = ({ children }: { children: ReactNode }) => {
    const { authState } = useContext(AuthContext);
    const [state, dispatch] = useReducer(HomeReducer, initialState);
    const userId = authState.user?.uid ?? "";

    useEffect(() => {
        let active = true;
        const loadStats = async () => {
            try {
                const result = await getHomeStats(userId);
                if (!active) return;
                if (result.ok === true) {
                    dispatch({ type: ACCION_TYPES.load, payload: { stats: result.stats, loading: false, errorMessage: null } });
                } else {
                    dispatch({ type: ACCION_TYPES.load, payload: { stats: null, loading: false, errorMessage: result.errorMessage } });
                }
            } catch {
                if (active) dispatch({ type: ACCION_TYPES.load, payload: { stats: null, loading: false, errorMessage: "No se pudieron cargar los contadores." } });
            }
        };
        loadStats();
        return () => { active = false; };
    }, [userId]);

    return <HomeContext.Provider value={state}>{children}</HomeContext.Provider>;
};
