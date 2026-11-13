import { createContext } from "react";
import type { HomeContextValue } from "../types/HomeInterfaces";

export const HomeContext = createContext<HomeContextValue>({} as HomeContextValue);
