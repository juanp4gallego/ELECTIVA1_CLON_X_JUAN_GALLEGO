import type { User } from "../../auth/types/AuthReducerInterfaces";
import type { TweetAttachment, TweetResult } from "../types/TweetInterfaces";

export const publishTweet = async (message: string, userId: User, attachment?: TweetAttachment): Promise<TweetResult> => {
    if (!userId?.uid) return { ok: false, errorMessage: "Debes iniciar sesión para publicar." };
    if (!message.trim()) return { ok: false, errorMessage: "Escribe un mensaje." };
    if (message.length > 280) return { ok: false, errorMessage: "El mensaje no puede superar los 280 caracteres." };

    return {
        ok: true,
        tweet: {
            id: crypto.randomUUID(),
            userId,
            attachment,
            message: message.trim(),
            createdAt: new Date(),
        },
    };
};

