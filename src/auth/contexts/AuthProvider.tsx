import { registerUserByCredentials } from "../../firebase/registerProvider";
import type { RegisterForm } from "../types/RegisterInterfaces";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { FirebaseAuth } from "../../firebase/config"
import { useEffect, useReducer, useState, type ReactNode } from "react"
import { AuthContext } from "./AuthContext"
import { AuthReducer } from "../reducers/AuthReducer"
import type { AuthReducerAction, AuthState, User } from "../types/AuthReducerInterfaces"
import { loginUserByCredentials, loginUserByGoogleProvider } from '../../firebase/providers';
import { ACCION_TYPES } from '../reducers/actionTypes';

const initialState = {
    logged: false,
    user: null
} as AuthState

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [registrationError, setRegistrationError] = useState<string | null>(null);
    const register = async (form: RegisterForm): Promise<boolean> => {
        const result = await registerUserByCredentials(form);
        setRegistrationError(result.errorMessage);
        return result.ok;
    };
    const [authState, dispatch] = useReducer(AuthReducer, initialState)
    const [checkingSession, setCheckingSession] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(FirebaseAuth, (firebaseUser) => {
            dispatch({
                type: firebaseUser ? "login" : "logout",
                payload: {
                    logged: !!firebaseUser,
                    user: firebaseUser ? {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email ?? "",
                        photoURL: firebaseUser.photoURL ?? "",
                        username: firebaseUser.displayName ?? "",
                    } : null,
                    errorMessage: null,
                },
            });
            setCheckingSession(false);
        }, () => {
            dispatch({ type: "logout", payload: { logged: false, user: null, errorMessage: null } });
            setCheckingSession(false);
        });
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {

        const result = await loginUserByCredentials(email, password)
        if ("uid" in result) {
            const { uid, photoURL, displayName } = result;
            const user = {
                uid,
                email,
                photoURL,
                username: displayName,
            } as User;

            const action = {
                type: ACCION_TYPES.login,
                payload: {
                    logged: true,
                    user
                }
            } as AuthReducerAction

            dispatch(action);
            return true;
        } else {
            const action = {
                type: ACCION_TYPES.error,
                payload: {
                    logged: false,
                    user: null,
                    errorMessage: result.errorMessage
                }
            } as AuthReducerAction

            dispatch(action);
            return false;
        }
    }

    const logout = async (): Promise<boolean> => {
        try {
            await signOut(FirebaseAuth);
        } catch {
            return false;
        }
        dispatch({
            type: ACCION_TYPES.logout,
            payload: {
                logged: false,
                user: null,
                errorMessage: null
            }
        } as AuthReducerAction
        );
        return true;
    }

    const loginWithGoogle = async (): Promise<boolean> => {
        const { ok, displayName, email, photoURL, uid, errorMessage } = await loginUserByGoogleProvider();

        if (!ok) {
            const action = {
                type: ACCION_TYPES.error,
                payload: {
                    logged: false,
                    user: null,
                    errorMessage: errorMessage
                }
            } as AuthReducerAction

            dispatch(action);
        }
        const user = {
            uid,
            email,
            photoURL,
            username: displayName,
        } as User;

        const action = {
            type: ACCION_TYPES.login,
            payload: {
                logged: true,
                user
            }
        } as AuthReducerAction

        dispatch(action);

        return true;
    }

    return (
        <AuthContext.Provider value={{ register, registrationError, authState, checkingSession, login, logout, loginWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}

