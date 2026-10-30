export interface HomeStats {
    followers: number;
    following: number;
}
export type HomeResult = { ok: true; stats: HomeStats } | { ok: false; errorMessage: string };
export interface HomeContextValue {
    stats: HomeStats | null;
    loading: boolean;
    errorMessage: string | null;
}
