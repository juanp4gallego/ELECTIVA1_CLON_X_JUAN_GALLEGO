import { onAuthStateChanged, signOut } from "firebase/auth"
import { FirebaseAuth } from "../../firebase/config"
import { useEffect, useReducer, useState, type ReactNode } from "react"
import { AuthContext } from "./AuthContext"
import { AuthReducer } from "../reducers/AuthReducer"
import type { AuthReducerAction, AuthState, User } from "../types/AuthReducerInterfaces"
import { loginUserByCredentials } from "../../firebase/providers"

const initialState = {
    logged: false,
    user: null
} as AuthState

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

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
                type: "login",
                payload: {
                    logged: true,
                    user
                }
            } as AuthReducerAction

            dispatch(action);
            return true;
        } else {
            const action = {
                type : 'error',
                payload : {
                    logged : false,
                    user : null,
                    errorMessage: result.errorMessage
                }
            } as AuthReducerAction

            dispatch(action);
            return false;
        }
    }

    const logout = async () : Promise<boolean> => {
        try {
            await signOut(FirebaseAuth);
        } catch {
            return false;
        }
        dispatch({
            type: "logout",
            payload: {
                logged: false,
                user: null,
                errorMessage : null
            }
        });
        return true;
    }

    return (
        <AuthContext.Provider value={{ authState, checkingSession, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
