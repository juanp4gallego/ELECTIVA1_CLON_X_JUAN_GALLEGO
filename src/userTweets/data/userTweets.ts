import { getTestUser } from "../../tweets/data/testUsers";
import type { Tweet } from "../../tweets/types/TweetInterfaces";

export const userTweets: Tweet[] = [
    { id: "t1", userId: getTestUser("66BhwhcBJuUhRwU7xuQsGAJEKNm2"), message: "Hoy empecé un proyecto nuevo.", createdAt: new Date("2026-10-20T14:00:00Z") },
    { id: "t2", userId: getTestUser("66BhwhcBJuUhRwU7xuQsGAJEKNm2"), message: "Aprendiendo a trabajar con React.", createdAt: new Date("2026-10-29T14:00:00Z") },
    { id: "t3", userId: getTestUser("66BhwhcBJuUhRwU7xuQsGAJEKNm2"), message: "Un paso más en el proyecto.", createdAt: new Date("2026-10-22T14:00:00Z") },
    { id: "t4", userId: getTestUser("66BhwhcBJuUhRwU7xuQsGAJEKNm2"), message: "Buen día para estudiar.", createdAt: new Date("2026-10-21T14:00:00Z") },
    { id: "t5", userId: getTestUser("66BhwhcBJuUhRwU7xuQsGAJEKNm2"), message: "Probando los componentes.", createdAt: new Date("2026-10-23T14:00:00Z") },
    { id: "t6", userId: getTestUser("66BhwhcBJuUhRwU7xuQsGAJEKNm2"), message: "Ya funciona la navegación.", createdAt: new Date("2026-10-24T14:00:00Z") },
    { id: "t7", userId: getTestUser("66BhwhcBJuUhRwU7xuQsGAJEKNm2"), message: "Compartiendo lo aprendido.", createdAt: new Date("2026-10-25T14:00:00Z") },
    { id: "t8", userId: getTestUser("66BhwhcBJuUhRwU7xuQsGAJEKNm2"), message: "Organizando las tareas.", createdAt: new Date("2026-10-26T14:00:00Z") },
    { id: "t9", userId: getTestUser("66BhwhcBJuUhRwU7xuQsGAJEKNm2"), message: "Terminando el formulario.", createdAt: new Date("2026-10-27T14:00:00Z") },
    { id: "t10", userId: getTestUser("66BhwhcBJuUhRwU7xuQsGAJEKNm2"), message: "Revisando los datos de prueba.", createdAt: new Date("2026-10-28T14:00:00Z") },
    { id: "t11", userId: getTestUser("66BhwhcBJuUhRwU7xuQsGAJEKNm2"), message: "Lista la primera versión.", createdAt: new Date("2026-10-30T14:00:00Z") },
    { id: "t12", userId: getTestUser("66BhwhcBJuUhRwU7xuQsGAJEKNm2"), message: "Hola, esta es mi primera publicación.", createdAt: new Date("2026-10-29T15:00:00Z") },
];

export const profileStats = [
    { uid: "u3", followers: 24, following: 16 },
    { uid: "f1", followers: 18, following: 9 },
];
