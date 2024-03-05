export interface User {
    id: number,
    name: string,
    apellido: string,
    puntos: number,
    role: string,
    subscribed: boolean,
    image?: string
}