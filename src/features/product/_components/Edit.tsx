import { useProductQuery } from '@/hooks/useProductQuery'
import { useParams } from 'react-router-dom'
import NameForm from './NameForm'
import PriceForm from './Price'

const Edit = () => {
    const { id } = useParams()
    const { data } = useProductQuery(id)
    return (
        <div>
            <div className='grid grid-cols-2'>
                <div>
                    <NameForm data={data} />
                </div>
                <div>
                    <PriceForm data={data} />
                </div>
            </div>
        </div>
    )
}

export default Edit
