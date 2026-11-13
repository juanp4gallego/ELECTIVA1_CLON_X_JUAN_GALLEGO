import { createContext } from "react";
import type { FollowersContextValue } from "../types/FollowerInterfaces";

export const FollowersContext = createContext<FollowersContextValue>({} as FollowersContextValue);
