import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { AxiosService } from "../../service/api.service";
import { Header } from "../../components/landing/Header";
import ReactPlayer from "react-player";
import { Course, Professsor, Subject } from "../../models/models";
import './subject.css'
import { BsEye, BsHeart, BsHeartFill } from "react-icons/bs";
import { FcStart } from "react-icons/fc";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { FaRegFlag } from "react-icons/fa";
import { Resource } from "../../components/subject/Resource";
import { ClassesMain } from './ClassesMain'
import { PrivateRoutes } from "../../models/routes";
import { ClassWithSubject } from "../../components/course/Course";
import { Link } from "react-router-dom";
import { Footer } from "../../components/global/footer/Footer";
import { HeaderRigth } from "../../components/global/headerRight/HeaderRIght";
interface AppState {
    infoSubject: Subject | null,
    infoCourse: Course | null,
    btnline: TypeBtns,
    progress: string[],
    classes: ClassWithSubject[],
    professor: Professsor | null,
    likeList: {
        subject_id: number
    }[],
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

    const [infoCourse, setinfoCourse] = useState<AppState['infoCourse']>(null)
    const [infoSubject, setInfoSubject] = useState<AppState['infoSubject']>(null)
    const [classes, setClasses] = useState<AppState['classes']>([]);
    const [btnSelected, setBtnSelected] = useState<AppState['btnline']>(TypeBtns.SYLLABUS);
    const btnline = useRef<AppState['btnline']>(TypeBtns.SYLLABUS);
    const [progress, setProgress] = useState<AppState['progress']>([]);
    const [likeList, setLikeList] = useState<AppState['likeList']>([]);

    const viewRef = useRef(0);
    const likesRef = useRef(0);
    const professorRef = useRef<AppState['professor']>(null);

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
        const response = AxiosService.get(url, params);
    }

    const getInfo = async () => {
        const url1 = 'curso/course/?'
        const url2 = 'subject/get-subject/?'
        const url3 = 'clase/get-class-progress'
        const params = {
            idCourse: idCourse?.split('-')[0],
        }
        /* Enviar el id del curso */
        const params1 = {
            idCourse: idCourse?.split('-')[0],
            nroClass: idClass,
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
                professorRef.current = res[0].data.professor

                setInfoSubject(res[1].data.subject)
                viewRef.current = res[1].data.views; 
                likesRef.current = res[1].data.likes;
                updateProgres(res[1].data.subject.id)
                
                setProgress(res[2].data.progress)
                setLikeList(res[2].data.likeList)
            })
    }

    const handlePrevius = () => {
        //1/2 -> 1/10 /1/1
        const valueCurrently = classes.filter(value => value.numero_clase === Number(idClass));

        if(Number(idSubject) > 1 ){
            navigate(`/${PrivateRoutes.RUTAS}/${path}/${idCourse}/${idClass}/${Number(idSubject) - 1}`)
            return;
        }   

        //2/1 -> 1/n   3/1 -> 2/n
        const lastValue = classes.filter(value => value.numero_clase === (valueCurrently[0].numero_clase - 1))
        if(Number(idSubject) === 1 && Number(idClass) > 1){
            navigate(`/${PrivateRoutes.RUTAS}/${path}/${idCourse}/${Number(idClass) - 1}/${lastValue[0].subjects.length}`)
            return;
        }
    }
    const handleNext = () => {
        const value = classes.filter(value => value.numero_clase === Number(idClass));
        const lastValue = classes.reduce ((arr, val) => {
            if( val.numero_clase > arr.numero_clase){
                return val;
            }
            return arr;
        },classes[0]) 

        if(Number(idSubject) < value[0].subjects.length ){
            navigate(`/${PrivateRoutes.RUTAS}/${path}/${idCourse}/${idClass}/${Number(idSubject) + 1}`)
            return;
        }   
        if(lastValue.numero_clase > Number(idClass)){
            navigate(`/${PrivateRoutes.RUTAS}/${path}/${idCourse}/${Number(idClass) + 1}/1`)
            return;
        }
    }

    const handleLike = () => {
        //para que el cambio ser visual, agregar a likeLIst el id del subject, si despues del request no tiene existo hacer un rollback.
        const indexValue = likeList.findIndex(value => value.subject_id === infoSubject?.id);
        if(indexValue >= 0){ 
            likesRef.current = likesRef.current - 1;
            const copy = structuredClone(likeList);
            const newList = copy.splice(indexValue, 0);
            setLikeList(newList);
        }else{
            if(infoSubject?.id){
                likesRef.current = likesRef.current + 1;
                setLikeList([...likeList, { subject_id : infoSubject.id}]);
            }
        }

        const url = 'subject/update-likes'
        const params = {
            idSubject: infoSubject?.id,
            idStudent: 8
        }
        const response = AxiosService.get(url, params);
        //update quantity likes yiaa
    }

    const volumeConfig = {
        youtube: {
          playerVars: {
            controls: 1,
            modestbranding: 1,
            loop: 1,
            fs: 1,
            rel: 0,
            autohide: 0,
            showinfo: 0,
            disablekb: 0,
            enablejsapi: 1,
            iv_load_policy: 3,
          },
        },
      };
      
    return (
        <div className="subject">
            <Header>
            </Header>

            <section>
                <div className='player-wrapper'>
                    <ReactPlayer
                        className='react-player'
                        url={infoSubject?.video_url}
                        width='100%'
                        height='100%'
                        playing={true}
                        onEnded={handleNext}
                        controls={true}
                      
                    />
                </div>
            </section>

            <div className="controls-player">
                <button className="f-btn" onCanPlay={handleLike}>
                    {
                        likeList.some(value => value.subject_id === infoSubject?.id) ? 
                        <BsHeartFill style={{color: 'red'}}/>
                        : 
                        <BsHeart/>
                    }
                    <span>{likesRef.current}</span>
                </button>
                <button className="f-btn">
                    <FcStart />
                    <span>Rep. Automatica</span>
                </button>
                <button className="f-btn" onClick={handlePrevius}>
                      <MdSkipPrevious />
                    <span>
                        Anterior
                    </span>
                </button>
                <button className="f-btn" onClick={handleNext}>
                    <MdSkipNext />
                    Siguiente
                </button>
            </div>

            <div className="subject-info">
                <h2>{infoSubject?.title}</h2>
                <div className="subject-info-sub">
                    <BsEye style={{ width: '0.8rem', height: '0.8rem' }} />
                    <p>{viewRef.current} Vistas</p>
                    <Link to={`/${PrivateRoutes.RUTAS}/${path}/${idCourse}`} style={{ textDecoration: 'none' }}>
                     <p>{infoCourse?.name}</p>
                    </Link>
                </div>
                <div className="subject-info-teacher">
                    <div className="subject-info-teacher-content">
                        <img className="" src={professorRef.current?.url_image} alt="" />
                        <p className="my-0 mr-2">{professorRef.current?.firstname} {professorRef.current?.lastname}</p>
                    </div>
                    <FaRegFlag />
                </div>
            </div>

            <div className="subject-btns-line">
                <button className={` ${btnSelected === TypeBtns.RESOURCE ? 'flag' : ''} `} onClick={() => setBtnSelected(TypeBtns.RESOURCE)}>
                    Recursos
                </button>
                <button  className={` ${btnSelected == TypeBtns.SYLLABUS ? 'flag' : ''}`} onClick={() => setBtnSelected(TypeBtns.SYLLABUS)}>
                    <p  style={{paddingBottom: '0.2rem', margin: '0'}}> Temario </p>
                 </button>
                <button  className={` ${btnSelected === TypeBtns.CONTRIBUTION ? 'flag' : ''}`} onClick={() => setBtnSelected(TypeBtns.CONTRIBUTION)}>
                    Aportes
                </button>
            </div>

            {CurrentView}

            <Footer/>
        </div>

    )
}