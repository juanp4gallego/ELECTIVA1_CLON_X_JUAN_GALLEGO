import type { AuthReducerAction, AuthState } from "../types/AuthReducerInterfaces";


export const AuthReducer = ( state : AuthState, action : AuthReducerAction ) => {

    switch (action.type) {
        case "login":
            return {
                ... state,
                logged : true,
                user: action.payload.user
            }
            
        case "logout":
            return {
                ...state,
                ...action.payload
            }
        
        case "error":
            return {
                logged : false,
                user : null,
                errorMessage : action.payload.errorMessage
            }
    
        default:
            return state;
    }
}