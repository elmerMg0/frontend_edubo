import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { typePlans } from "../../utilities/constans";
import { APISERVICE } from "../../service/api.service";
import { Plan } from "../../models/models";
import "./payment.css";
import { Header } from "../global/header/Header";
import { PiShoppingCartLight } from "react-icons/pi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { BsTrophy } from "react-icons/bs";
import AddDementBtns from "../global/addDecrementBtns/AddDementBtns";
import { FaCircleCheck } from "react-icons/fa6";
import { Spinner } from "react-bootstrap";
import { PrivateRoutes } from "../../models/routes";
import { AppStore } from "../../redux/store";
import { useSelector } from "react-redux";
import { Footer } from "../global/footer/Footer";
import toast from "react-hot-toast";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
interface AppState {
  plan: Plan | null;
  item: {
    name?: string;
    descripcion?: string;
    subtitle?: string;
    id: number;
    url_image: string;
    numero_cursos?: number;
    nombre?: string;
  } | null;
  infoQr: {
    movimiento_id: number;
    qr: string;
  } | null;
  path: {
    id: number,
    nombre: string
  } | null;
}

function Payment() {
  const { type, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<AppState["plan"]>(null);
  const [item, setItem] = useState<AppState["item"]>(null);
  const [quantity, setQuantity] = useState(1);
  const [infoQr, setInfoQr] = useState<AppState["infoQr"]>(null);
  const [view, setView] = useState(1);
  const [loadingVerify, setLoadingVefify] = useState(false);
  const [path, setPath] = useState <AppState["path"]>(null);
  const navigate = useNavigate();
  const user = useSelector((store: AppStore) => store.user);
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      setLoading(true);
      const body = {
        id: id,
        type: type === typePlans.course ? "course" : "road",
      };
      /* Planes del path o course, PATH / COUSE info,  */
      const response: any = await APISERVICE.post(body, "api/plan", "");
      if (response?.success) {
        setPlan(response.data.plan);
        setItem(response.data.item);
        setPath(response.data.road)
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPayment = async () => {
    try {
      setLoadingVefify(true)
      const url = `api/verify/`;
      const body = {
        movimiento_id: String(infoQr?.movimiento_id),
        type: type === typePlans.course ? "course" : "path",
        student: user.id,
        path: path?.id,
        plan: plan?.id,
        quantity: quantity,
        id: item?.id
      };
      const response = await APISERVICE.post(body, url, "");
      if (response.success) {
        setView(3);
      }
    } catch (error) {
      toast.error('No se pudo verificar el pago');
    } finally {
      setLoadingVefify(false)
    }
  };

  const handleGetQr = async () => {
    try {
      setLoading(true)
      const url = `api/payment-qr/`;
      const body = {
        type: type,
        id: id,
        quantity: quantity,
      };
      
      const response = await APISERVICE.post(body, url, "");
      if (response.success) {
        setView(2);
        setInfoQr(response.data.qr);
      }
    } catch (error) {

    } finally{
      setLoading(false)
    }
  };

  const handleGoClass = () => {
    let newPath = ''
    if(type === typePlans.course){
      newPath = `${path?.id + "-" + path?.nombre}/${item?.id + "-" + item?.name}`;
    }else{
      newPath = `${path?.id + "-" + path?.nombre}`
    }
    navigate(`/${PrivateRoutes.RUTAS}/${newPath}`);
  } 

  const PaymentSuccess = () => {
    return (
      <div className="payment-success">
        <h5>Envio Exitoso</h5>
        <span className="payment-success-icon">
          <FaCircleCheck size={70}/>
        </span>
        <p>Su pago se ha realizado con exito</p>
        <button className="f-btn btn--padding btn--l-white w-100" onClick={handleGoClass}>
          Ir{" "}
          {type === typePlans.course ? "al curso" : "a la ruta de aprendizaje"}
        </button>
      </div>
    );
  }; 

  const PaymentQr = () => {
    return (
      <div>
        <h4 className="payment-qr-title">Por favor realice el pago con el siguiente qr</h4>
        <div className="payment-qr">
          <img src={`data:image/png;base64,${infoQr?.qr}`} alt="" />
        </div>
        <button
          className="f-btn btn--padding btn--l-white w-100"
          onClick={handleVerifyPayment}
        >
          {
            loadingVerify ? <Spinner size="sm"/> : 'Ya hice le pago'
          }
        </button>
      </div>
    );
  };

  const CartList = () => {
    return (
      <>
        <table className="w-100">
          <thead>
            <tr>
              <th style={{fontWeight: 600, color: 'var(--colorWhite)'}} >{type === typePlans.course ? "Curso" : "Modulo"}</th>
              <th style={{fontWeight: 600, color: 'var(--colorWhite)'}}>Precio</th>
              <th style={{fontWeight: 600, color: 'var(--colorWhite)', textAlign: "right"}}>Cant./Mes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{plan?.nombre}</td>
              <td>Bs. {plan?.precio_total}</td>
              <td className="text-end">
                <AddDementBtns quantity={quantity} setQuantity={setQuantity} />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>Total</td>
              <td className="text-end">
                Bs. {plan?.precio_total ? plan?.precio_total * quantity : 1 * quantity}
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-cupon">Tienes un cupon?</p>
        <button
          className="f-btn btn--padding btn--l-white w-100"
          onClick={handleGetQr}
        >
          {
            loading ? <Spinner size="sm"/> : 'Continuar'
          }
        </button>
      </>
    );
  };
  const viewSelected: any = {
    1: <CartList />,
    2: <PaymentQr />,
    3: <PaymentSuccess />,
  };
  const widthWindow = window.innerWidth;
  return (
    <div className="payment-container">
      <Header />
      <main className="payment">
        <section className="payment-card-detail">
          <h3>Resumen de suscripción</h3>

          <div className="payment-card-item">
            <p>suscripción al plan {plan?.nombre}</p>

            <div className="payment-card-info">
              <div className="payment-card-main">
                <div className="payment-card-img">
                  <img src={APIURLIMG + item?.url_image} alt={item?.name} />
                </div>
                <div className="payment-card-text">
                  <p>{item?.name ?? item?.nombre}</p>
                  <p>{item?.descripcion ?? item?.subtitle}</p>
                </div>
              </div>

              <div className="payment-card-item-price">
                <p>
                  {" "}
                  Bs. {plan?.precio_total}/{plan?.duracion}{" "}
                </p>
              </div>
            </div>

            <div className="payment-card-price">
              <p>
                <span>Total</span> Bs. {plan?.precio_total}
              </p>
            </div>
          </div>
        </section>
        <article className="payment-card-total">
          <div className="payment-card-steps">
            <div className={`payment-card-step-1 ${view > 0 ? "active" : ""}`}>
              <span className="payment-card-icon">
                <PiShoppingCartLight />
              </span>
              <p>Carrito</p>
            </div>
            <div className={`payment-card-step-2 ${view > 1 ? "active" : ""}`}>
              <span className="payment-card-icon">
                <FaRegMoneyBillAlt />
              </span>
              <p>Pago</p>
            </div>
            <div className={`payment-card-step-3 ${view > 2 ? "active" : ""}`}>
              <span className="payment-card-icon">
                <BsTrophy />
              </span>
              <p>Confirmación</p>
            </div>
          </div>
          <div className="payment-detail">{viewSelected[view]}</div>
        </article>
      </main>
      {
        widthWindow < 800 && <Footer />
      }
    </div>
  );
}

export default Payment;
