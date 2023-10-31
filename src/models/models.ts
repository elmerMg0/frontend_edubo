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
    duracion: string
    nivel: string,
    ruta_aprendizaje_id?: number,
    active: boolean
}

export interface Class{
    id?: number,
    titulo: string,
    descripcion: string,
    duracion: string,
    active: boolean,    
    numero_clase: number  
    curso_id?: number,
}

export interface Question {
    id?: number,
    descripcion: string,
    respuesta: string,
    url_image?: string,
    clase_id?: number,
    active: boolean
}