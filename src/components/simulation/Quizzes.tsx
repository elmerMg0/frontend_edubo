import  { useEffect, useState } from 'react'
import { Header } from '../global/header/Header'
import { AxiosService } from '../../service/api.service';
import { useNavigate, useParams } from 'react-router';
import { Quiz } from '../../models/models';
import { Footer } from '../global/footer/Footer';
import Skeleton from 'react-loading-skeleton';

function Quizzes() {
    const [ quizzes, setQuizzes ] = useState<Quiz[]>([])
    const { id } = useParams();
    const [ loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getInfo();
    },[])

    const getInfo = async () => {
        try {
            setLoading(true)
            const params = {
                id: id,
                type: "course"
            }
            const response: any = await AxiosService.get('api/quizzes', params)
            if(response.success){
                setQuizzes(response.data.quizzes)
            }
        } catch (error) {
            
        } finally{
            setLoading(false)
        }
       
    }

  return (
    <div className="quizzes">
        <Header />
        <div className='container-content'>
            <h2>Simulaciones</h2>
            <ul className='quizzes-list'>
            {
                quizzes?.length > 0 ? quizzes.map((quiz: Quiz) => {
                    return (
                        <li key={quiz.id} className='quizzes-item'>
                            <p className=''>{quiz.descripcion}</p>
                            <button className='btn btn--primary' onClick={() => navigate(`${quiz.id}`)}>Empezar</button>
                        </li>
                    )
                }):
                <div className='quizzes-list' style={{gap: '0.21rem'}}>
                    {
                        loading ?
                        <>
                            <Skeleton height={25} count={1} width={'50%'}/>
                            <Skeleton height={30} count={1}/>
                            <Skeleton height={25} count={1} width={'50%'}/>
                            <Skeleton height={30} count={1}/>
                            <Skeleton height={25} count={1} width={'50%'}/>
                            <Skeleton height={30} count={1}/>
                            <Skeleton height={25} count={1} width={'50%'}/>
                            <Skeleton height={30} count={1}/>
                            <Skeleton height={25} count={1} width={'50%'}/>
                            <Skeleton height={30} count={1}/>
                        </>
                         :
                         <p>No hay simulaciones disponibles</p>
                    }
                </div>
            }
            </ul>
        </div>
        <Footer/>
    </div>
  )
}

export default Quizzes