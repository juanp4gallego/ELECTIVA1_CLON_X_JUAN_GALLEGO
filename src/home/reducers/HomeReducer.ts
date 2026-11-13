import type { HomeContextValue } from "../types/HomeInterfaces";
import type { HomeReducerAction } from "../types/HomeReducerInterfaces";
import { ACCION_TYPES } from "./actionTypes";

export const HomeReducer = (state: HomeContextValue, action: HomeReducerAction): HomeContextValue => {
    switch (action.type) {
        case ACCION_TYPES.error:
            return { ...state, ...action.payload };
        case ACCION_TYPES.load:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
