const APIURL = import.meta.env.VITE_REACT_APP_API_URL

export const RoadServiceName = {
    GET: 'ruta-aprendizaje/index/?',
    CREATE: 'ruta-aprendizaje/create/?',
    UPDATE: 'ruta-aprendizaje/update/?'
}
export const CourseServiceName = {
    GET: 'curso/index/?',
    CREATE: 'curso/create/?',
    UPDATE: 'curso/update/?',
    GET_ROADS_WITH_COURSES: 'ruta-aprendizaje/get-roads-with-courses/?'
}

export const ClassServiceName = {
    GET: 'clase/index/?',
    CREATE: 'clase/create/?',
    UPDATE: 'clase/update/?',
    GET_COURSE_WITH_CLASSES: 'curso/get-course-with-classes/?'
}

export const QuestionServiceName = {
    GET: 'pregunta/index/?',
    CREATE: 'pregunta/create/?',
    UPDATE: 'pregunta/update/?',
    GET_CLASS_WITH_QUESTIONS: 'clase/get-class-with-questions/?'
}
export const ResourceServiceName = {
    GET: 'resource/index/?',
    CREATE: 'resource/create/?',
    UPDATE: 'resource/update/?',
    GET_ROADS_WITH_RESOURCES: 'ruta-aprendizaje/get-roads-with-resources/?'
}