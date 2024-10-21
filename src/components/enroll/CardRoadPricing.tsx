//import { useNavigate } from "react-router";
import { Plan } from "../../models/models";

interface Props {
  plan: Plan | null;
  color: string;
  handleSetPlanSelected: (plan: Plan) => void;
  roadName: string;
}
function CardRoadPricing({
  plan,
  handleSetPlanSelected,
  roadName,
}: Props) {
  //const navigate = useNavigate()
  if (plan == null) return;
  const handlePayment = () => {
    //navigate('pago');
    const mensaje = `Hola, me gustaria suscribirme al ${plan?.nombre} para el curso preuniversitario para la ${roadName}.`;
    const mensajeCodificado = encodeURIComponent(mensaje);
    const numeroTelefono = "63021573";
    const whatsappUrl = `https://wa.me/591${numeroTelefono}?text=${mensajeCodificado}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className={`card-pricing mb-4  card-pricing--${
        plan?.ruta_aprendizaje_id ? "green" : "yellow"
      }`}
      onClick={() => handleSetPlanSelected(plan)}
    >
      <header>
        <h4>
          {plan?.nombre}
          {plan?.ruta_aprendizaje_id && <p>{roadName}</p>}
        </h4>
        <p>{plan?.duracion}</p>
      </header>

      <section className="pricing-price">
        <h3>Bs.- {plan?.precio_total}</h3>
      </section>

      <main className={`pricing-benefits`}>
        <ul
          className=""
          dangerouslySetInnerHTML={{ __html: plan?.benefit ?? "" }}
        />
      </main>

      <footer className="mt-3">
        <button
          className={`f-btn btn-enroll btn-enroll--${
            plan?.ruta_aprendizaje_id ? "green" : "yellow"
          }`}
          onClick={handlePayment}
        >
          Suscribirme
        </button>
      </footer>
    </div>
  );
}

export default CardRoadPricing;
