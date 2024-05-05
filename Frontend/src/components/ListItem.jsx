import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

const ListItem = ({list}) => {
  return(
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg w-[25rem]">
      <Link to={`/publicacion/${list._id}`}>
        <img 
          src={list.imageUrls[0]} 
          alt={list.name} 
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
          />
          <div className="p-3 flex flex-col gap-2">
            <p className='text-lg font-semibold text-slate-700 truncate'>{list.name}</p>
            <div className="flex items-center gap-2">
              <MdLocationOn className='h-4 w-4 text-green-700' />
              <p className='text-sm text-gray-600 truncate'>{list.adress}</p>
            </div>
            <p className='text-sm text-gray-600 line-clamp-2'>{list.description}</p>
            <p className='text-slate-500 mt-2 font-semibold'>
              ${' '}
              {list.offer ? list.discountPrice.toLocaleString('en-US') : 
                list.regularPrice.toLocaleString('en-US')}
              {list.type === 'rent' && ' /mes'}
            </p>
            <div className="flex items-center gap-3 text-base font-bold text-slate-700">
              <div className="flex items-center gap-1">
                {list.bedrooms > 1 ? `${list.bedrooms} habitaciones`:
                  `${list.bedrooms} habitacion`}
              </div>
              <div className="flex items-center gap-1">
                {list.bathrooms > 1 ? `${list.bathrooms} baños`:
                  `${list.bathrooms} baño`}
              </div>
            </div>
          </div>
      </Link>
    </div>
  )
}

export { ListItem }