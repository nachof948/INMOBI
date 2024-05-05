import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { searchGet, searchMoreGet } from "../redux/actions/listing"
import { ListItem } from "../components/ListItem"


const Search = () => {
  const dispatch = useDispatch()
  const navegar = useNavigate()
  const {listing, showMore} = useSelector((state) => state.listing)

  const [sideBarData, setSideBarData] = useState({
    search:'',
    type:'all',
    parking:false,
    furnished:false,
    offer: false,
    sort:'created_at',
    order:'desc',
  })

  const handleChange = (e) =>{
    if( e.target.name === 'all' || 
        e.target.name === 'rent' || 
        e.target.name === 'sale'){
        setSideBarData({
          ...sideBarData,
          type: e.target.name
        })
    }
    if( e.target.name === 'offer' || 
        e.target.name === 'parking' || 
        e.target.name === 'furnished'){
          setSideBarData({
            ...sideBarData,
            [e.target.name]: 
            e.target.checked || e.target.checked === 'true' ? true : false,
          })
    }
    if(e.target.name === 'search'){
      setSideBarData({
        ...sideBarData,
        search:e.target.value
      })
    }
    
    if(e.target.name === 'sort_order'){
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSideBarData({
        ...sideBarData,
        sort,
        order,
      })
    }
  };
  

  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams()
    urlParams.set('search', sideBarData.search)
    urlParams.set('type', sideBarData.type)
    urlParams.set('parking', sideBarData.parking)
    urlParams.set('furnished', sideBarData.furnished)
    urlParams.set('offer', sideBarData.offer)
    urlParams.set('sort', sideBarData.sort)
    urlParams.set('order', sideBarData.order)
    const searchQuery = urlParams.toString()
    navegar(`/search?${searchQuery}`) 
    dispatch(searchGet(searchQuery))
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTerm = urlParams.get('search')
    const typeTerm = urlParams.get('type')
    const parkingTerm = urlParams.get('parking')
    const furnishedTerm = urlParams.get('furnished')
    const offerTerm = urlParams.get('offer')
    const sortTerm = urlParams.get('sort')
    const orderTerm = urlParams.get('order')
    
    if(searchTerm || typeTerm || parkingTerm || furnishedTerm ||
        offerTerm || sortTerm || orderTerm
    ){
      setSideBarData({
        search: searchTerm || '',
        type: typeTerm || 'all',
        parking: parkingTerm === 'true' ? true : false,
        furnished: furnishedTerm === 'true' ? true : false,
        offer: offerTerm === 'true' ? true : false,
        sort: sortTerm || 'createdAt',
        order: orderTerm || 'desc',
      })
    }
  },[location.search])
  
  const onShowMoreClick = () =>{
    const numberOfListings = listing.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    dispatch(searchMoreGet(searchQuery))
  }

  return(
    <section className="flex flex-col md:flex-row">
      <div className="p-7 md:min-h-screen border-b-2 border-b-slate-700 w-[30%] md:border-r-2 border-r-slate-600 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Busqueda:</label>
            <input 
              type="text" 
              name="search" 
              placeholder="Buscar..."
              className="boder p-3 rounded-lg w-full"
              value={sideBarData.search}
              onChange={handleChange}
              />
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <label className="text-lg">Tipo:</label>
            <div className=" flex items-center gap-2 font-semibold">
              <input 
                type="checkbox" 
                name="all" 
                className="w-4 h-4" 
                checked={sideBarData.type === 'all'}
                onChange={handleChange}
                />
              <span>Alquilar & Comprar</span>
            </div>
            <div className=" flex items-center gap-2 font-semibold">
              <input 
                type="checkbox" 
                name="rent" 
                className="w-4 h-4" 
                checked={sideBarData.type === 'rent'}
                onChange={handleChange}
                />
              <span>Alquilar</span>
            </div>
            <div className=" flex items-center gap-2 font-semibold">
              <input 
                type="checkbox" 
                name="sale" 
                className="w-4 h-4" 
                checked={sideBarData.type === 'sale'}
                onChange={handleChange}
                />
              <span>Comprar</span>
            </div>
            <div className=" flex items-center gap-2 font-semibold">
              <input 
                type="checkbox" 
                name="offer" 
                className="w-4 h-4" 
                checked={sideBarData.offer}
                onChange={handleChange}
                />
              <span>Oferta</span>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <label className="text-lg">Comodidades:</label>
            <div className=" flex items-center gap-2 font-semibold">
              <input 
                type="checkbox" 
                name="parking" 
                className="w-4 h-4" 
                checked={sideBarData.parking}
                onChange={handleChange}
                />
              <span>Estacionamiento</span>
            </div>
            <div className=" flex items-center gap-2 font-semibold">
              <input 
                type="checkbox" 
                name="furnished" 
                className="w-4 h-4" 
                checked={sideBarData.furnished}
                onChange={handleChange}
                />
              <span>Amueblado</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label>Ordenar</label>
            <select name="sort_order" 
              className="border rounded-lg p-3"
              onChange={handleChange}
              defaultValue={'createdAt_desc'}
              >
              <option value='regularPrice_desc'>Precio alto a bajo</option>
              <option value='regularPrice_asc'>Precio bajo a alto</option>
              <option value='createdAt_desc'>Recientes</option>
              <option value='createdAt_asc'>Antiguas</option>
            </select>
          </div>
          <button className="bg-slate-700 p-3 text-white uppercase rounded-lg hover:opacity-90">Buscar</button>
        </form>
      </div>
      <div className="w-[70%]">
        <h1 className="text-3xl font-semibold border border-b-slate-900 p-3 mt-5 text-slate-700 ">Propiedades:</h1>
        <div className="flex flex-wrap gap-10 p-3 justify-center overflow-y-auto">
          {listing.length === 0 && <p className="text-3xl font-semibold text-red-700">No se encontraron esas propiedades!</p>}
          {listing.map((list) =>(
            <ListItem key={list._id} list={list}/>
          ))}
          {showMore && 
          <button 
            className="text-green-700 text-lg mb-3 hover:underline"
            onClick={() => onShowMoreClick()}
            >
              Mostrar mas propiedades
            </button>}
        </div>
        
    </div>
    </section>
  )
}

export { Search }