import { FirebaseError, initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, deleteUser, getAuth, signOut, updateProfile, validatePassword } from "firebase/auth";
import { FirebaseApp } from "./config";
import type { RegisterForm, RegisterResult } from "../auth/types/RegisterInterfaces";

// La sesión de registro es independiente del login.
const registerApp = initializeApp(FirebaseApp.options, "registration");
const registerAuth = getAuth(registerApp);


export const registerUserByCredentials = async (form: RegisterForm): Promise<RegisterResult> => {
    const fullName = form.fullName.trim();
    const username = form.username.trim().toLowerCase();
    const email = form.email.trim().toLowerCase();
    if (!fullName) return { ok: false, errorMessage: "No se pudo crear la cuenta: escribe tu nombre completo." };
    if (!username) return { ok: false, errorMessage: "No se pudo crear la cuenta: escribe un nombre de usuario." };
    if (!/^[a-z0-9_]{3,20}$/.test(username)) return { ok: false, errorMessage: "El nombre de usuario debe tener entre 3 y 20 caracteres. Usa solo letras sin tildes, números o guion bajo, sin espacios." };
    if (!email) return { ok: false, errorMessage: "No se pudo crear la cuenta: escribe tu correo electrónico." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, errorMessage: "El correo electrónico no tiene un formato válido. Ejemplo: nombre@correo.com." };
    if (!form.password) return { ok: false, errorMessage: "No se pudo crear la cuenta: escribe una contraseña." };
    if (form.password.length < 6) return { ok: false, errorMessage: "La contraseña necesita al menos 6 caracteres. Agrega más caracteres e intenta nuevamente." };

    let createdUser = null;
    let saved = false;
    try {
        const validation = await validatePassword(registerAuth, form.password);
        if (!validation.isValid) {
            const missing: string[] = [];
            const policy = validation.passwordPolicy.customStrengthOptions;
            if (validation.meetsMinPasswordLength === false) missing.push("mínimo " + policy.minPasswordLength + " caracteres");
            if (validation.meetsMaxPasswordLength === false) missing.push("máximo " + policy.maxPasswordLength + " caracteres");
            if (validation.containsLowercaseLetter === false) missing.push("una letra minúscula");
            if (validation.containsUppercaseLetter === false) missing.push("una letra mayúscula");
            if (validation.containsNumericCharacter === false) missing.push("un número");
            if (validation.containsNonAlphanumericCharacter === false) missing.push("un símbolo");
            return { ok: false, errorMessage: "La contraseña necesita: " + (missing.join(", ") || "cumplir la política de seguridad del proyecto") + "." };
        }
        const result = await createUserWithEmailAndPassword(registerAuth, email, form.password);
        createdUser = result.user;
        await updateProfile(createdUser, { displayName: fullName });
        saved = true;
        return { ok: true, errorMessage: null };
    } catch (error) {
        if (createdUser && !saved) {
            try { await deleteUser(createdUser); }
            catch { return { ok: false, errorMessage: "La cuenta se creó, pero no se pudo actualizar el nombre ni cancelar el registro. Intenta iniciar sesión con el correo indicado." }; }
        }

        if (error instanceof FirebaseError) {
            if (error.code === "auth/network-request-failed" || error.code === "unavailable") return { ok: false, errorMessage: "No se pudo completar el registro por un problema de conexión. Revisa tu internet e intenta nuevamente." };
            if (error.code === "auth/too-many-requests" || error.code === "resource-exhausted") return { ok: false, errorMessage: "Hay demasiados intentos o el servicio alcanzó su límite. Espera unos minutos antes de volver a intentar." };
            if (error.code === "auth/operation-not-allowed") return { ok: false, errorMessage: "El registro por correo y contraseña no está habilitado. Contacta al administrador." };
            if (error.code === "auth/password-does-not-meet-requirements") return { ok: false, errorMessage: "La contraseña no cumple la política configurada en Firebase. Revisa los requisitos indicados debajo del campo." };
            if (error.code === "auth/email-already-in-use") return { ok: false, errorMessage: "No se pudo crear la cuenta: ese correo ya tiene una cuenta. Inicia sesión o utiliza otro correo." };
            if (error.code === "auth/invalid-email") return { ok: false, errorMessage: "El correo electrónico no es válido." };
            if (error.code === "auth/weak-password") return { ok: false, errorMessage: "Firebase rechazó la contraseña por ser débil. Usa al menos 6 caracteres y revisa los requisitos adicionales del proyecto." };

        }
        return { ok: false, errorMessage: "No se pudo completar el registro. Intenta nuevamente." };
    } finally {
        try { await signOut(registerAuth); } catch { }
    }
};




