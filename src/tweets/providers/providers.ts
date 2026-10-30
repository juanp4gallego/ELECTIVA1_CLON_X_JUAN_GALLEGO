import type { TweetResult } from "../types/TweetInterfaces";

export const publishTweet = async (message: string, userId: string): Promise<TweetResult> => {
    if (!userId) return { ok: false, errorMessage: "Debes iniciar sesión para publicar." };
    if (!message.trim()) return { ok: false, errorMessage: "Escribe un mensaje." };
    if (message.length > 280) return { ok: false, errorMessage: "El mensaje no puede superar los 280 caracteres." };

    return {
        ok: true,
        tweet: {
            id: crypto.randomUUID(),
            userId,
            message: message.trim(),
            createdAt: new Date().toISOString(),
        },
    };
};
