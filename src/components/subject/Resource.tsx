import { Resource } from '../../models/models'
import './subject.css'

interface Props {
    resources: Resource[]
}
export function ResourceComponent({ resources }:Props) {
    return (
        <section className='subject-resource'>
            <h2 className='title-section-subject'>Recursos de curso</h2>
            {
                resources?.length > 0 ? resources.map((resource: Resource) => (
                    <div key={resource.id} className="subject-resource-card" dangerouslySetInnerHTML={{ __html: resource.descripcion }} />
                ))
                
                :
                <p>Estamos trabajando en la expansión de los recursos disponibles.</p>
            }
        </section>
    )
}