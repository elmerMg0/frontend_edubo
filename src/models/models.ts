export type PageInfo = {
    count: number,
    next: number,
    page: number,
    previus: number,
    start: number,
    totalPages: number
}   
export interface Road {
    id?: number,
    nombre: string,
    descripcion: string,
    numero_cursos: number,
    active: boolean
}