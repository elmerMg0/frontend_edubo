import { useEffect, useState } from "react";
import { APISERVICE, AxiosService } from "../../service/api.service";
import { useParams } from "react-router";
import { Header } from "../global/header/Header";
import "./pricing.css";
import { typePlans } from "../../utilities/constans";
import { Plan, Road } from "../../models/models";
import CardRoadPricing from "./CardRoadPricing";
import { Footer } from "../global/footer/Footer";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";

interface AppState {
  road: Road | null;
  plans: Plan[];
  plansCourse: Plan[];
  plan: Plan | null;
}
function Pricing() {
  const { type, id } = useParams();
  const [road, setRoad] = useState<AppState["road"]>(null);
  const [plans, setPlans] = useState<AppState["plans"]>([]);
  const [plansCourse, setPlansCourse] = useState<AppState["plans"]>([]);
  const [planSelected, setPlanSelected] = useState<AppState['plan']>(null);

  const user = useSelector((store: AppStore) => store.user);
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
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
    }
  };

  const handleEnroll = () => {
    /*  type, student, path, plan, quantity */
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
  }

  const handleSetPlanSelected = (plan: Plan) => {
    setPlanSelected(plan)
    console.log(plan)
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
        <div className="pricing-plans">
          <CardRoadPricing plans={plans} color={"yellow"} handleSetPlanSelected={handleSetPlanSelected}/>
          <CardRoadPricing plans={plansCourse} color={"green"} handleSetPlanSelected={handleSetPlanSelected}/>
        </div>
      </div>

      <button className="f-btn btn-enroll btn--green" onClick={handleEnroll}>Test inscripcion. not valid</button>
      <Footer/>
    </div>
  );
}

export default Pricing;
