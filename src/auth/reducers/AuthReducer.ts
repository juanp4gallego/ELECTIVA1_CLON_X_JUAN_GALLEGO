import type { AuthReducerAction, AuthState } from "../types/AuthReducerInterfaces";
import { ACCION_TYPES } from './actionTypes';


export const AuthReducer = ( state : AuthState, action : AuthReducerAction ) => {

    switch (action.type) {
        case ACCION_TYPES.login:
            return {
                ... state,
                logged : true,
                user: action.payload.user,
                errorMessage: null
            }
            
        case ACCION_TYPES.logout:
            return {
                ...state,
                ...action.payload
            }
        
        case ACCION_TYPES.error:
            return {
                logged : false,
                user : null,
                errorMessage : action.payload.errorMessage
            }
    
        default:
            return state;
    }
}
