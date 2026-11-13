export interface RegisterForm {
    fullName: string;
    username: string;
    email: string;
    password: string;
}
export interface RegisterResult {
    ok: boolean;
    errorMessage: string | null;
}
