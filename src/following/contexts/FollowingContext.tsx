import { createContext } from "react";
import type { FollowingState } from "../types/FollowingInterfaces";

export const FollowingContext = createContext<FollowingState>({} as FollowingState);
