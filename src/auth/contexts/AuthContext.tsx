import { createContext } from "react";
import type { AuthState } from '../types/AuthReducerInterfaces';

interface AuthContextValueObjete {
    authState:AuthState,
    login: (email:string, password:string) => Promise<boolean>;
    logout: () => boolean;
    loginWithGoogle: () => Promise<boolean>;
}
const defaultValue = {} as AuthContextValueObjete;
export const AuthContext = createContext(defaultValue);