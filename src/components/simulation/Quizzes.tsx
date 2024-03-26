import  { useEffect, useState } from 'react'
import { Header } from '../global/header/Header'
import { AxiosService } from '../../service/api.service';
import { useNavigate, useParams } from 'react-router';
import { Quiz } from '../../models/models';
import { Footer } from '../global/footer/Footer';

function Quizzes() {
    const [ quizzes, setQuizzes ] = useState<Quiz[]>([])
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getInfo();
    },[])

    const getInfo = async () => {
        const params = {
            id: id,
            type: "course"
        }
        const response: any = await AxiosService.get('api/quizzes', params)
        if(response.success){
            setQuizzes(response.data.quizzes)
        }
    }

  return (
    <div className="quizzes">
        <Header />
        <h2>Quizzes</h2>
        {
            quizzes?.length > 0 ? quizzes.map((quiz: Quiz) => {
                return (
                    <div key={quiz.id}>
                        <p>{quiz.descripcion}</p>
                        <button className='f-btn btn--l-white' onClick={() => navigate(`${quiz.id}`)}>Empezar</button>
                    </div>
                )
            }):
            <h1>Proximamente</h1>
        }
        <Footer/>
    </div>
  )
}

export default Quizzes