import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth, FirebaseApp } from './config';

interface AuthResult {
    ok: boolean,
    uid: string,
    email: string | null,
    displayName: string | null,
    photoURL: string | null
}

interface AuthErrorResult {
    ok: boolean,
    errorMessage: string
}

// settings
const GoogleProvider = new GoogleAuthProvider();

export const loginUserByCredentials = async (email: string, password: string): Promise<AuthResult | AuthErrorResult> => {
    try {

        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password)

        const user = result.user;

        const { uid, displayName, photoURL } = user;

        return {
            ok: true,
            uid, email, displayName, photoURL
        };

    } catch (error: any) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const loginUserByGoogleProvider = async (): Promise<AuthResult | AuthErrorResult> => {
    try {
        const result = await signInWithPopup(FirebaseAuth, GoogleProvider);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            uid, email, displayName, photoURL
        };
    } catch (error: any) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}
