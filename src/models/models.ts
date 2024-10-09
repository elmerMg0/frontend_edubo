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
    active: boolean,
    slug?: string,
    subtitle?: string,
    url_image?: string,
    carrers?: string,
    duration?: string,
    period?: string,
    admission_mode?: string
}

export interface Course {
    id?: number,
    name: string,
    descripcion: string
    duracion: string
    nivel: string,
    ruta_aprendizaje_id?: number,
    active: boolean,
    url_image?: string,
    subtitle?: string,
    you_learn: string,
    create_ts: string,
    informacion?: string,
    slug?: string,
    num_quizzes?: number
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
    active: boolean,
    subtitle?: string,
}
export interface Resource {
    id?: number,
    descripcion: string,
    url_video: string,
    clase_id?: number,
    active: boolean
}

export interface Subject {
    id?: number,
    title:string
    is_public: boolean,
    slug: string,
    clase_id?: number,
    duration: string,
    video_url?: string,
    type: string
}
export interface Professsor{
    id?:number,
    firstname: string,
    lastname: string,
    biography: string,
    nickname: string
    url_image: string
}

export interface Comment{
    id?: number,
    comment_text: string,
    usuario_id: number,
    subject_id: number
    num_likes: number
    num_comments: number
}

export interface Response{
    id?: number,
    description: string,
    url_image: string,
    slug: string
}

export interface Plan{
    id: number,
    nombre: string,
    active?: boolean,
    precio_total: number,
    duracion: string,
    benefit: string,
    course_id?: number,
    ruta_aprendizaje_id?: number
}

export interface Quiz{
    id?: number,
    descripcion: string,
    url_image?: string,
    curso_id?: number,
    ruta_aprendizaje_id?:number,
}

export interface Answer{
    id?: number,
    description: string,
    slug: string,
    url_image?: string,
    pregunta_id?: number
}

export interface FileI{
    id?: number,
    name: string,
    active: boolean,
    file_url: string,
    size: string,
    subject_id: number,
    type?: string,
    extension: string
}