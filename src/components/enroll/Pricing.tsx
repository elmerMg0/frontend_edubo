import { useEffect, useState } from "react";
import { AxiosService } from "../../service/api.service";
import { useParams } from "react-router";
import { Header } from "../global/header/Header";
import "./pricing.css";
import { typePlans } from "../../utilities/constans";
import { Plan, Road } from "../../models/models";
import CardRoadPricing from "./CardRoadPricing";
import { Footer } from "../global/footer/Footer";

interface AppState {
  road: Road | null;
  plans: Plan[];
  plansCourse: Plan[];
}
function Pricing() {
  const { type, id } = useParams();
  const [road, setRoad] = useState<AppState["road"]>(null);
  const [plans, setPlans] = useState<AppState["plans"]>([]);
  const [plansCourse, setPlansCourse] = useState<AppState["plans"]>([]);

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
          <CardRoadPricing plans={plans} color={"yellow"} />
          <CardRoadPricing plans={plansCourse} color={"green"} />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Pricing;
