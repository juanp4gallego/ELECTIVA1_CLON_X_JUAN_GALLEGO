export interface AuthState {
    logged : boolean;
    user : User | null;
    errorMessage : string | null
}

export interface User {
    uid : string, 
    email : string;
    photoURL : string,
    username : string;
}

export interface AuthReducerAction {
    type : ActionType;
    payload : AuthState;
}

export type ActionType = "login" | "logout" | 'error';