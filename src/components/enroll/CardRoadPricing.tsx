import { Plan, Road } from "../../models/models"

interface Props{
    plans: Plan[]
    color: string
}
function CardRoadPricing({plans,color}: Props) {

    if(plans.length === 0)return;
    return (
    <div className={`card-pricing mb-4  card-pricing--${color}`}>
        <header>
                <h4>{plans[0].nombre}</h4>
                <p>{plans[0].duracion}</p>
          {/*   <p>Para 1 estudiante</p> */}
        </header>

        <section className="pricing-price">
            <h3>Bs.- {plans[0].precio_total}</h3>
        </section>

        <main className={`pricing-benefits`}>
            <ul className="" dangerouslySetInnerHTML={{ __html: plans[0]?.benefit ?? '' }} />
        </main>

        <footer>
            <button className={`f-btn btn-enroll btn-enroll--${color}`}>Suscribirme</button>
        </footer>
    </div>
  )
}

export default CardRoadPricing