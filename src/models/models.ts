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

export interface Course {
    id?: number,
    titulo: string,
    descripcion: string
    duracion: number
    nivel: string,
    ruta_aprendizaje_id?: number,
    active: boolean
}