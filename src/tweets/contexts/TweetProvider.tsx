import { FirebaseError } from "firebase/app";
import { collection, doc, setDoc } from "firebase/firestore";
import { FireBaseDB } from "../../firebase/config";
import type { User } from "../../auth/types/AuthReducerInterfaces";
import { TweetReducer } from "../reducers/TweetReducer";
import { ACCION_TYPES } from "../reducers/actionTypes";
import { useReducer, type ReactNode } from "react";
import { TweetContext } from "./TweetContext";
import { publishTweet as publishTweetByMessage } from "../providers/providers";
import type { TweetAttachment, TweetState } from "../types/TweetInterfaces";

const initialState: TweetState = {
    tweets: [],
    errorMessage: null,
    successMessage: null,
};

interface TweetProviderProps {
    children: ReactNode;
}

export const TweetProvider = ({ children }: TweetProviderProps) => {
    const [tweetState, dispatch] = useReducer(TweetReducer, initialState);

    const publishTweet = async (message: string, userId: User, attachment?: TweetAttachment): Promise<boolean> => {
        try {
            const result = await publishTweetByMessage(message, userId, attachment);
            if (result.ok === true) {
                const tweetCollection = collection(FireBaseDB, "tweets");
                const newDoc = doc(tweetCollection);
                const tweet = { ...result.tweet, id: newDoc.id };

                // El adjunto ya viene como data URL base64 desde el formulario.
                if (!attachment) delete tweet.attachment;

                // Dejamos margen al límite de 1 MiB por documento de Firestore.
                const documentSize = new TextEncoder().encode(JSON.stringify(tweet)).length;
                if (documentSize > 900 * 1024) {
                    dispatch({ type: ACCION_TYPES.error, payload: { errorMessage: "El tweet con su adjunto es demasiado grande. Selecciona un archivo menor de 600 KB." } });
                    return false;
                }

                await setDoc(newDoc, tweet);


                const action = {
                    type: ACCION_TYPES.publish,
                    payload: { tweet },
                } as const;
                dispatch(action);
                return true;
            } else {
                dispatch({ type: ACCION_TYPES.error, payload: { errorMessage: result.errorMessage } });
                return false;
            }
        } catch (error) {
            let errorMessage = "No se pudo guardar el tweet. Intenta nuevamente.";
            if (error instanceof FirebaseError) {
                if (error.code === "permission-denied") errorMessage = "Firestore no permite guardar el tweet. Revisa los permisos de la colección tweets.";
                if (error.code === "unavailable") errorMessage = "No se pudo conectar con Firebase. Revisa tu conexión.";
            }
            dispatch({ type: ACCION_TYPES.error, payload: { errorMessage } });
            return false;
        }
    };

    const clearMessage = () => {
        dispatch({ type: ACCION_TYPES.clear, payload: {} });
    };

    return (
        <TweetContext.Provider value={{ tweetState, publishTweet, clearMessage }}>
            {children}
        </TweetContext.Provider>
    );
};



