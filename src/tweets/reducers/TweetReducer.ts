import type { TweetState } from "../types/TweetInterfaces";
import type { TweetReducerAction } from "../types/TweetReducerInterfaces";
import { ACCION_TYPES } from "./actionTypes";

export const TweetReducer = (state: TweetState, action: TweetReducerAction): TweetState => {
    switch (action.type) {
        case ACCION_TYPES.publish:
            if (!action.payload.tweet) return state;
            return { ...state, tweets: [action.payload.tweet, ...state.tweets], errorMessage: null, successMessage: "Tweet publicado correctamente." };
        case ACCION_TYPES.clear:
            return { ...state, errorMessage: null, successMessage: null };
        case ACCION_TYPES.error:
            return { ...state, errorMessage: action.payload.errorMessage ?? null, successMessage: null };
        case ACCION_TYPES.load:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
