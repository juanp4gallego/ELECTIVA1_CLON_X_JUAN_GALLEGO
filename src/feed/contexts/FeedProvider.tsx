import { FirebaseError } from "firebase/app";
import { useEffect, useReducer, type ReactNode } from "react";
import { FeedReducer } from "../reducers/FeedReducer";
import { ACCION_TYPES } from "../reducers/actionTypes";
import type { FeedState } from "../types/FeedInterfaces";
import { getFeedTweets } from "../providers/providers";
import { FeedContext } from "./FeedContext";

const initialState: FeedState = { tweets: [], loading: true, errorMessage: null };

interface FeedProviderProps {
    children: ReactNode;
}

export const FeedProvider = ({ children }: FeedProviderProps) => {
    const [feedState, dispatch] = useReducer(FeedReducer, initialState);

    useEffect(() => {
        return getFeedTweets(tweets => {
            dispatch({ type: ACCION_TYPES.load, payload: { tweets, loading: false, errorMessage: null } });
        }, error => {
            dispatch({ type: ACCION_TYPES.error, payload: {
                tweets: [],
                loading: false,
                errorMessage: error instanceof FirebaseError && error.code === "permission-denied"
                    ? "No tienes permiso para consultar el feed. Revisa la regla de lectura de tweets."
                    : "No se pudo cargar el feed. Revisa tu conexión y los datos de las publicaciones.",
            } });
        });
    }, []);

    return <FeedContext.Provider value={feedState}>{children}</FeedContext.Provider>;
};
