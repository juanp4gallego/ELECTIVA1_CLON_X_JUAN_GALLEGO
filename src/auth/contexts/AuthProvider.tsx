import { useReducer, type ReactNode } from "react"
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

    const login = async (email: string, password: string): Promise<boolean> => {

        const { ok, uid, photoURL, displayName, errorMessage } = await loginUserByCredentials(email, password)
        if (ok) {
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
                    errorMessage: errorMessage
                }
            } as AuthReducerAction

            dispatch(action);
            return false;
        }
    }

    const logout = () : boolean => {
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
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}