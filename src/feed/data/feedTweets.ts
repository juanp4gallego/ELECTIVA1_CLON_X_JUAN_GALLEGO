import { getTestUser } from "../../tweets/data/testUsers";
import type { Tweet } from "../../tweets/types/TweetInterfaces";

// Publicaciones de prueba para el feed.
export const feedTweets: Tweet[] = [
    { id: "feed1", userId: getTestUser("u1"), message: "Hoy aprendí algo nuevo en clase.", createdAt: new Date("2026-10-30T16:00:00Z") },
    { id: "feed2", userId: getTestUser("u2"), message: "Avanzando con el proyecto de React.", createdAt: new Date("2026-10-29T18:00:00Z") },
    { id: "feed3", userId: getTestUser("u3"), message: "Buen día para compartir ideas.", createdAt: new Date("2026-10-30T15:00:00Z") },
    { id: "feed4", userId: getTestUser("u4"), message: "Terminando las tareas de la semana.", createdAt: new Date("2026-10-28T12:00:00Z") },
    { id: "feed5", userId: getTestUser("u5"), message: "Probando los datos del proyecto.", createdAt: new Date("2026-10-27T14:00:00Z") },
    { id: "feed6", userId: getTestUser("u6"), message: "Ya funciona mi formulario.", createdAt: new Date("2026-10-26T10:00:00Z") },
    { id: "feed7", userId: getTestUser("u7"), message: "Compartiendo una nueva publicación.", createdAt: new Date("2026-10-25T13:00:00Z") },
    { id: "feed8", userId: getTestUser("u8"), message: "Organizando mis componentes.", createdAt: new Date("2026-10-24T17:00:00Z") },
    { id: "feed9", userId: getTestUser("u9"), message: "Aprendiendo sobre context.", createdAt: new Date("2026-10-23T16:00:00Z") },
    { id: "feed10", userId: getTestUser("u10"), message: "Un paso más para terminar.", createdAt: new Date("2026-10-22T12:00:00Z") },
    { id: "feed11", userId: getTestUser("u11"), message: "Revisando la navegación.", createdAt: new Date("2026-10-21T14:00:00Z") },
    { id: "feed12", userId: getTestUser("f1"), message: "Esta publicación aparece si me sigues.", createdAt: new Date("2026-10-30T17:00:00Z") },
];
