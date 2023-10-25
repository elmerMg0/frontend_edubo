export interface User {
    username: string,
    accessToken: string,
    periodUser: {
        id: number,
        state: boolean
    }
    tipo: string
}