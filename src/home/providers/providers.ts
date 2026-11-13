import type { HomeResult } from "../types/HomeInterfaces";

export const getHomeStats = async (userId: string): Promise<HomeResult> => {
    if (!userId) return { ok: false, errorMessage: "Debes iniciar sesión." };
    return { ok: true, stats: { followers: 12, following: 8 } };
};
