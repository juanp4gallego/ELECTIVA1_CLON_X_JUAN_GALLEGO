import type { RegisterForm } from "../types/RegisterInterfaces";
import { createContext } from "react";
import type { AuthState } from '../types/AuthReducerInterfaces';

interface AuthContextValueObjete {
    register: (form: RegisterForm) => Promise<boolean>;
    registrationError: string | null;
    checkingSession: boolean;
    authState:AuthState,
    login: (email:string, password:string) => Promise<boolean>;
    logout: () => Promise<boolean>;
    loginWithGoogle: () => Promise<boolean>;
}
const defaultValue = {} as AuthContextValueObjete;
export const AuthContext = createContext(defaultValue);
