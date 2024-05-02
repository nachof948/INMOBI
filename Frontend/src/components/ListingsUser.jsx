import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { listGet, listingDelete, listingUserGet } from "../redux/actions/listing"
import { Loading } from '../components/Loading'

const ListingsUser = ({userId}) => {

  const dispatch = useDispatch()
  const {listing} = useSelector((state) => state.listing)
  const { isLoading } = useSelector((state) => state.auth)


  useEffect(() => {
    dispatch(listingUserGet(userId))
  } ,[dispatch, userId ])
  

  const userDeleteListing = async (id) =>{
    try {
      dispatch(listingDelete(id))
      console.log('Se elimino correctamente')
    } catch (error) {
      console.log(error)
    }
  } 
  
  const handle = (id) =>{
    dispatch(listGet(id))
  }

  return (
    <div className="mt-9 flex flex-col gap-3">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-center font-semibold text-2xl mb-4">
            {listing.length === 0 ? 'No tienes publicaciones' : 'Tus Publicaciones'}
          </h1>
          {listing.map((list) => (
            <div key={list._id} className="border border-slate-800 rounded-lg p-3 flex items-center gap-4">
              <Link to={`/publicacion/${list._id}`}>
                <img src={list.imageUrls[0]} className="w-40 object-contain rounded-lg" alt={list.name}/>
              </Link>
              <Link className="text-slate-700 font-semibold flex-1 hover:underline truncate" to={`/publicacion/${list._id}`}>
                <p>{list.name}</p>
              </Link>
              <div className="flex flex-col">
                <button className="text-red-700 uppercase font-semibold" onClick={() => userDeleteListing(list._id)}>Eliminar</button>
                <button className="text-green-700 uppercase font-semibold" onClick={() => handle(list._id)}>Editar</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export { ListingsUser }