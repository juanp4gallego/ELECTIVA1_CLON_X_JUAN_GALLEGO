import type { HomeContextValue } from "./HomeInterfaces";
export interface HomeReducerAction {
    type: "load" | "error";
    payload: Partial<HomeContextValue> & {
    };
}
