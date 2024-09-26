export interface User {
    id: number,
    name: string,
    apellido: string,
    puntos: number,
    role: string,
    subscribed: boolean,
    image?: string,
    username: string,
    accessToken: string,
    email: string,
    telefono: string
}