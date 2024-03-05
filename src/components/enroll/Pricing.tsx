import { useEffect, useState } from "react";
import {  AxiosService } from "../../service/api.service";
import { useParams } from "react-router";
import { Header } from "../global/header/Header";
import "./pricing.css";
import { typePlans } from "../../utilities/constans";
import { Course, Plan, Road } from "../../models/models";
import CardRoadPricing from "./CardRoadPricing";
import { Footer } from "../global/footer/Footer";
//import { useSelector } from "react-redux";
//import { AppStore } from "../../redux/store";
import Skeleton from "react-loading-skeleton";

interface AppState {
  road: Road | null;
  plans: Plan[];
  plansCourse: Plan[];
  plan: Plan | null;
  course: Course | null;
}
function Pricing() {
  const { type, id } = useParams();
  const [road, setRoad] = useState<AppState["road"]>(null);
  const [plans, setPlans] = useState<AppState["plans"]>([]);
  const [plansCourse, setPlansCourse] = useState<AppState["plans"]>([]);
  const [planSelected, setPlanSelected] = useState<AppState['plan']>(null);
  const [course, setCourse] = useState<AppState["course"]>(null);
    const [loading, setLoading] = useState(false);
  //const user = useSelector((store: AppStore) => store.user);
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      setLoading(true)
      const params = {
        idRoad: type === typePlans.road ? id : "",
        idCourse: type === typePlans.course ? id : "",
      };
      /* Planes del path o course, PATH / COUSE info,  */
      const response: any = await AxiosService.get("api/plans", params);
      if (response?.success) {
        setPlans(response.data.plansRoad);
        setRoad(response.data.path);
        setPlansCourse(response.data.plansCourse);
        setCourse(response.data.course)
      }
    } catch (error) {
      
    } finally{
      setLoading(false)
    }
  
  };

 /*  const handleEnroll = () => {
    try {
      const body = {
        type: planSelected?.course_id ? "course" : "path",
        student: user.id,
        path: road?.id,
        plan: planSelected?.id,
        quantity: 1,
        id: planSelected?.course_id?? planSelected?.ruta_aprendizaje_id
      }
      const response: any = APISERVICE.post(body, "api/enroll", '');
      if(response.success){

      }
    } catch (error) {
      
    }
  } */

  const sendMessage = (plan: Plan) => {
    let textMessage = ''
    if(plan.course_id){
      textMessage = 'Hola%20me%20interesa%20el%20paquete%20'+plan.nombre+'%20para%20el%20curso%20'+ course?.name
    }else{  
      textMessage = 'Hola%20me%20interesa%20el%20paquete%20'+plan.nombre+'%20para%20la%20'+ road?.nombre
    }
    window.open(`https://api.whatsapp.com/send?phone=+59165322739&text=${textMessage}`, '_blank');
  }

  const handleSetPlanSelected = (plan: Plan) => {
    setPlanSelected(plan)
    planSelected
  }
  return (
    <div className="pricing-bg">
      <Header />
      <div className="pricing">
        <h3 className="pricing-title mt-2 mb-2">
          Preparate para {road?.nombre}
        </h3>
        <p className="pricing-description mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas sed
          amet nostrum explicabo{" "}
        </p>
        {
          loading ? 
          <Skeleton height={400}/>
          :
        <div className="pricing-plans">
          <CardRoadPricing plans={plans} color={"yellow"} handleSetPlanSelected={handleSetPlanSelected} sendMessage={sendMessage}/>
          <CardRoadPricing plans={plansCourse} color={"green"} handleSetPlanSelected={handleSetPlanSelected} sendMessage={sendMessage}/>
        </div>
        }
      </div>

     {/*  <button className="f-btn btn-enroll btn--green" onClick={handleEnroll}>Test inscripcion. not valid</button> */}
      <Footer/>
    </div>
  );
}

export default Pricing;