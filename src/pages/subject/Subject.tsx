import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { AxiosService } from "../../service/api.service";
import { Header } from "../../components/landing/Header";
import ReactPlayer from "react-player";
import { Subject } from "../../models/models";
import './subject.css'
import { BsEye, BsHeart } from "react-icons/bs";
import { FcStart } from "react-icons/fc";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { FaRegFlag } from "react-icons/fa";
import { Resource } from "../../components/subject/Resource";
import { ClassesMain } from './ClassesMain'
import { PrivateRoutes } from "../../models/routes";
interface AppState {
    infoSubject: Subject | null,
    infoCourse: Subject[],
    btnline: TypeBtns,
    progress: String[]
}
enum TypeBtns {
    SYLLABUS = 'syllabus',
    RESOURCE = 'resource',
    CONTRIBUTION = 'contribution',
}


function Contribution({ props }: any) {
    return (
        <h1>Proximamente</h1>
    )
}

interface TypesBtns {
    resource: React.ReactNode
    syllabus: React.ReactNode
    contribution: React.ReactNode
}

export function Subject() {
    const { idSubject, idClass, idCourse, path } = useParams();

    const [infoCourse, setinfoCourse] = useState(null)
    const [infoSubject, setInfoSubject] = useState<AppState['infoSubject']>(null)
    const [classes, setClasses] = useState([]);
    const [btnSelected, setBtnSelected] = useState<AppState['btnline']>(TypeBtns.SYLLABUS);
    const btnline = useRef<AppState['btnline']>(TypeBtns.SYLLABUS);
    const [progress, setProgress] = useState<AppState['progress']>([])
    const navigate = useNavigate();
    const views: TypesBtns = {
        resource: <Resource />,
        syllabus: <ClassesMain classes={classes} progress={progress}/>,
        contribution: <Contribution props='subject' />
    }

    const CurrentView: React.ReactNode = views[btnSelected];

    useEffect(() => {
        getInfo()
       
        return () => {
            window.scrollTo(0, 0);
        }
    }, [idSubject, idClass])

    const updateProgres = async (id: any) => {
        const url = 'clase/update-progress'
        const params = {
            idSubject: id,
            idStudent: 8
        }
        const response = await AxiosService.get(url, params)
    }

    const getInfo = async () => {
        const url1 = 'curso/course/?'
        const url2 = 'subject/get-subject/?'
        const url3 = 'clase/get-class-progress'
        const params = {
            idCourse: idCourse?.split('-')[0],
        }
        const params1 = {
            idClass: idClass,
            slugSubject: idSubject
        }
        const params2 = {
            idCourse: idCourse?.split('-')[0],
            idStudent: 8
        }
        const promiss1 = AxiosService.get(url1, params);
        const promiss2 = AxiosService.get(url2, params1);
        const promise3 = AxiosService.get(url3, params2);
        Promise.all([promiss1, promiss2, promise3])
            .then(res => {
                setinfoCourse(res[0].data.course)
                setClasses(res[0].data.classes)
                setInfoSubject(res[1].subject)
                setProgress(res[2].progress)
                updateProgres(res[1].subject.id)
            })
    }

    const handlePrevius = () => {
        
    }
    const handleNext = () => {
        const value = classes.filter(value => value.id === Number(idClass));
        console.log(value)
        if(Number(idSubject) < value[0].subjects.length ){
            navigate(`/${PrivateRoutes.RUTAS}/${path}/${idCourse}/${idClass}/${Number(idSubject) + 1}`)
        }

       
    }
    return (
        <div className="subject">
            <Header>
                <p>lo</p>
            </Header>

            <section>
                <div className='player-wrapper'>
                    <ReactPlayer
                        className='react-player'
                        url={infoSubject?.video_url}
                        width='100%'
                        height='100%'
                        playing={true}
                        controls
                    />
                </div>
            </section>
            <div className="controls-player">
                <button className="f-btn">
                    <BsHeart />
                    <span>1000</span>
                </button>
                <button className="f-btn">
                    <FcStart />
                    <span>Rep. Automatica</span>
                </button>
                <button className="f-btn" onClick={handlePrevius}>
                    <MdSkipPrevious />
                    Anterior
                </button>
                <button className="f-btn" onClick={handleNext}>
                    <MdSkipNext />
                    Siguiente
                </button>
            </div>

            <div className="subject-info">
                <h2>{infoSubject?.title}</h2>
                <div className="subject-info-sub">
                    <BsEye />
                    <p>{infoSubject?.views} Vistas</p>
                    <p>{infoCourse?.name}</p>
                </div>
                <div className="subject-info-teacher">
                    <div className="subject-info-teacher-content">
                        <img className="" src="https://picsum.photos/200" alt="" />
                        <p className="my-0 mr-2">Teacher name</p>
                    </div>
                    <FaRegFlag />
                </div>
            </div>

            <div className="subject-btns-line">
                <button className={`f-btn ${btnSelected === TypeBtns.RESOURCE ? 'flag' : ''} `} onClick={() => setBtnSelected(TypeBtns.RESOURCE)}>
                    Recursos
                </button>
                <button className={`f-btn ${btnSelected == TypeBtns.SYLLABUS ? 'flag' : ''}`} onClick={() => setBtnSelected(TypeBtns.SYLLABUS)}>
                    <span> Temario </span>
                 </button>
                <button className={`f-btn ${btnSelected === TypeBtns.CONTRIBUTION ? 'flag' : ''}`} onClick={() => setBtnSelected(TypeBtns.CONTRIBUTION)}>
                    Aportes
                </button>
            </div>

            {CurrentView}

        </div>

    )
}