import { useEffect, useState } from "react";
import { AxiosService } from "../../service/api.service";
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
  const [planSelected, setPlanSelected] = useState<AppState["plan"]>(null);
  //const [course, setCourse] = useState<AppState["course"]>(null);
  const [loading, setLoading] = useState(false);
  //const user = useSelector((store: AppStore) => store.user);
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      setLoading(true);
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
        //setCourse(response.data.course)
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleSetPlanSelected = (plan: Plan) => {
    setPlanSelected(plan);
    planSelected;
  };
  return (
    <div className="pricing-bg">
      <Header />
      <div className="pricing">
        <h2 className="pricing-title mt-2 mb-2">
          Preparate para {road?.nombre}
        </h2>
        <p className="pricing-description mb-5">
          Con material de calidad y enfoque práctico, estarás listo para el
          éxito académico y profesional. ¡Inicia tu experiencia de aprendizaje
          ahora!"{" "}
        </p>
        {loading ? (
          <div className="pricing-plans">
            <div className="w-100 mb-3">
              <Skeleton height={400}/>
            </div>
            <div className="w-100">
              <Skeleton height={400}/>
            </div>
          </div>
        ) : (
          <div className="pricing-plans">
            {plans.length > 0 &&
              [...plans, ...plansCourse].map((plan: Plan) => (
                <CardRoadPricing
                  key={plan.id}
                  plan={plan}
                  color={"green"}
                  handleSetPlanSelected={handleSetPlanSelected}
                  roadName={road?.nombre ?? ""}
                />
              ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Pricing;
